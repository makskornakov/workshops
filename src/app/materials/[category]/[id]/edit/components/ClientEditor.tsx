'use client';
import { Material } from '@prisma/client';
import UploadMediaZone, { materialMediaFileInputId } from '~/components/UploadMedia';
import { useState } from 'react';
import { useEdgeStore } from '~/lib/edgestore';
import { assignMaterialMediaUrl } from '~/actions/serverActions';
import { MaterialEditorForm, SelectWrapLabel } from './Editor.styled';
import { styled } from '@linaria/react';
import { useForm } from 'react-hook-form';

import {
  complexityValues,
  maxMaterialFieldsLengths as maxLengths,
  timeConsumptionValues,
} from '~/configs/config';
import Heading from '~/components/layout/heading/Heading';
import { usePreventClosingWindowWhileSending } from '~/hooks/usePreventClosingWindowWhileSending';
import { colorVar } from '~/utils/colors';

function useMaterialForm(
  material: Material & { author: { name: string }; category: { name: string } },
) {
  return useForm({
    defaultValues: {
      title: material.title,
      description: material.description ?? '',
      content: material.paragraph ?? '',
      category: material.category.name,
      complexity: material.complexity,
      timeConsumption: material.timeConsumption,
    },
  });
}

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

  const {
    register,
    watch,
    formState: { isDirty },
  } = useMaterialForm(material);
  usePreventClosingWindowWhileSending(isDirty);

  const { edgestore } = useEdgeStore();

  const [pageDragOver, setPageDragOver] = useState(false);
  return (
    <>
      <Heading
        title="Editing Material: "
        style={{ gap: '.5rem' }}
        requireConfirmation={isDirty || !!file}
      >
        <span
          style={{
            color: '#a6a6a6',
          }}
        >
          {material.title}
        </span>
      </Heading>

      <MaterialEditorForm
        action={async (formData) => {
          try {
            if (file) {
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

              setFile(null);
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
            <label style={{ position: 'relative' }}>
              Title
              <input
                type="text"
                defaultValue={material.title}
                maxLength={maxLengths.title}
                {...register('title', { required: true })}
              ></input>
              <StyledLengthCounter style={{ bottom: '0.5rem' }}>
                {watch('title').length}
                <span> / {maxLengths.title}</span>
              </StyledLengthCounter>
            </label>
          </div>
          <div>
            <label
              onClick={(event) => {
                event.preventDefault();
                const selectComponent = event.currentTarget.querySelector('select');
                selectComponent?.dispatchEvent(new MouseEvent('mousedown')); // just .click() would not work, this is a hack.
              }}
            >
              Category
              <SelectWrapLabel>
                <select
                  defaultValue={material.category.name}
                  {...register('category', {
                    required: true,
                    onChange: (e) => setChosenCategory(e.target.value),
                  })}
                >
                  {categories.map((category) => (
                    <option key={category.slug} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </SelectWrapLabel>
            </label>
            <p
              style={{
                fontSize: '0.85rem',
                color: colorVar('tertiary-color'),
              }}
            >
              {categories.find((category) => category.name === chosenCategory)?.description}
            </p>
          </div>
          <div>
            <label htmlFor={materialMediaFileInputId}>Media Content</label>
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
          <StyledRangeContainer>
            <MyRangeComponent
              title="Complexity:"
              watchedValue={watch('complexity')}
              defaultValue={material.complexity}
              register={register}
              name="complexity"
              dictionary={complexityValues}
            />
            <MyRangeComponent
              title="Time consumption:"
              watchedValue={watch('timeConsumption')}
              defaultValue={material.timeConsumption}
              register={register}
              name="timeConsumption"
              dictionary={timeConsumptionValues}
            />
          </StyledRangeContainer>
          <div>
            <label style={{ position: 'relative' }}>
              Description
              <textarea
                maxLength={maxLengths.description}
                defaultValue={material.description ?? undefined}
                {...register('description')}
              ></textarea>
              <StyledLengthCounter>
                {watch('description').length}
                <span> / {maxLengths.description}</span>
              </StyledLengthCounter>
            </label>
          </div>
          <div
            style={{
              height: '100%',
            }}
          >
            <label
              style={{
                position: 'relative',
                flexGrow: 1,
              }}
            >
              Content
              <textarea
                id="content"
                maxLength={maxLengths.content}
                defaultValue={material.paragraph ?? undefined}
                style={{ maxHeight: '20rem', height: '100%' }}
                {...register('content')}
              ></textarea>
              <StyledLengthCounter>
                {watch('content').length}
                <span> / {maxLengths.content}</span>
              </StyledLengthCounter>
            </label>
          </div>
        </div>
        <div>
          <p>Author: {material.author.name}</p>
          <button type="submit" disabled={uploadingFile || saving || !isDirty}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </MaterialEditorForm>
    </>
  );
}

const MyRangeComponent = ({
  title,
  name,
  dictionary,
  watchedValue,
  register,
  ...rest
}: {
  title: string;
  name: ReturnType<ReturnType<typeof useMaterialForm>['register']>['name'];
  watchedValue: number;
  dictionary: string[];
  register: ReturnType<typeof useMaterialForm>['register'];
} & React.JSX.IntrinsicElements['input']) => {
  // console.log('watchedValue', watchedValue);
  return (
    <div>
      <p>
        {title}
        <span
          style={{
            color: `hsl(${(5 - watchedValue) * 25}, 85%, 50%)`,
          }}
        >
          {' '}
          {dictionary[watchedValue - 1]}
        </span>
      </p>
      <input type="range" min={1} max={5} step={1} {...rest} {...register(name)} />
    </div>
  );
};
const StyledRangeContainer = styled.div`
  /* outline: 1px solid red; */
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;

  div {
    /* outline: 1px solid blue; */

    width: 40%;
    font-weight: 300;
    color: ${colorVar('secondary-color')};
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  input[type='range'] {
    /* min-width: 100px; */
    appearance: none;
    width: 100%;
    height: 0.4rem;
    background: #333333;
    outline: none;
    border-radius: var(--border-radius-small);
    cursor: pointer;
    padding: 0;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 1rem;
      height: 1rem;
      background-color: ${colorVar('secondary-color')};
      border-radius: 50%;
      transition: background-color 0.2s ease-in-out;

      &:hover,
      &:focus,
      &:active {
        background-color: ${colorVar('main-color')};
      }
    }
  }
`;
const StyledLengthCounter = styled.span`
  font-size: 0.85rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.7rem;

  & > span {
    color: #808080;
  }
`;
