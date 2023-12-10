'use client';
import { Material } from '@prisma/client';
import UploadMediaZone from '../../../../../../components/UploadMedia';
import { useState } from 'react';
import { useEdgeStore } from '~/lib/edgestore';
import { assignMaterialMediaUrl } from '~/actions/serverActions';
import { MaterialEditorForm, SelectWrapLabel } from './Editor.styled';
import { styled } from '@linaria/react';

import { maxMaterialFieldsLengths as maxLengths } from '~/configs/config';

export default function ClientMaterialForm({
  action,
  material,
  categories,
}: {
  action: (formData: FormData) => Promise<void>;
  material: Material & { author: { name: string }; category: { name: string } };
  categories: { name: string; slug: string; description: string }[];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(material.category.name);

  const { edgestore } = useEdgeStore();

  const [pageDragOver, setPageDragOver] = useState(false);

  // restricting textarea lengths

  const [controlledInputs, setControlledInputs] = useState({
    title: material.title,
    description: material.description ?? '',
    content: material.paragraph ?? '',
  });

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { name, value } = event.target;
    if (value.length > maxLengths[name as keyof typeof maxLengths]) {
      return;
    }
    setControlledInputs((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <MaterialEditorForm
        // action={action}
        action={async (formData) => {
          try {
            if (file) {
              // console.log('set to true');
              setTimeout(() => {
                // Workaround to prevent batching
                setUploadingFile(true);
              });
              const res = await edgestore.mediaFiles.upload({
                file: file,
                // onProgressChange: (progress) => {
                //   // setProgress(progress);
                // },
                ...(material.mediaUrl
                  ? {
                      options: {
                        replaceTargetUrl: material.mediaUrl,
                      },
                    }
                  : undefined),
                input: {
                  materialId: material.id,
                },
              });
              console.log(res);
              setFile(null);
              // console.log('set to false');
              setTimeout(() => {
                // Workaround to prevent batching
                setUploadingFile(false);
              });
              setTimeout(() => {
                setSaving(true);
              });

              await assignMaterialMediaUrl(material.id, res.url);
              setSaving(false);
            }
            await action(formData);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <label style={{ position: 'relative' }}>
              <input
                type="text"
                id="title"
                name="title"
                value={controlledInputs.title}
                onChange={handleChange}
              ></input>
              <StyledLengthCounter style={{ bottom: '0.5rem' }}>
                {controlledInputs.title.length}
                <span> / {maxLengths.title}</span>
              </StyledLengthCounter>
            </label>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <SelectWrapLabel>
              <select
                id="category"
                name="category"
                defaultValue={material.category.name}
                value={chosenCategory}
                onChange={(e) => setChosenCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.slug} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </SelectWrapLabel>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--tertiary-color)',
              }}
            >
              {categories.find((category) => category.name === chosenCategory)?.description}
            </p>
          </div>
          <div>
            <label>Media Content</label>
            <UploadMediaZone
              material={material}
              file={file}
              setFile={setFile}
              uploadingFile={uploadingFile}
              setUploadingFile={setUploadingFile}
              pageDragOver={pageDragOver}
              setPageDragOver={setPageDragOver}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="description">Description</label>
            <label style={{ position: 'relative' }}>
              <textarea
                id="description"
                name="description"
                value={controlledInputs.description}
                onChange={handleChange}
              ></textarea>
              <StyledLengthCounter>
                {controlledInputs.description.length}
                <span> / {maxLengths.description}</span>
              </StyledLengthCounter>
            </label>
          </div>
          <div
            style={{
              height: '100%',
            }}
          >
            <label htmlFor="Content">Content</label>
            <label style={{ position: 'relative', flexGrow: 1 }}>
              <textarea
                id="content"
                name="content"
                value={controlledInputs.content}
                style={{ height: '100%', maxHeight: '20rem' }}
                onChange={handleChange}
              ></textarea>
              <StyledLengthCounter>
                {controlledInputs.content.length}
                <span> / {maxLengths.content}</span>
              </StyledLengthCounter>
            </label>
          </div>
        </div>
        <div>
          <p>Author: {material.author.name}</p>
          <button type="submit" disabled={uploadingFile || saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </MaterialEditorForm>
    </div>
  );
}

const StyledLengthCounter = styled.span`
  font-size: 0.85rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.7rem;

  & > span {
    color: #808080;
  }
`;
