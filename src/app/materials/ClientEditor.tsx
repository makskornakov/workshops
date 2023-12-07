'use client';
import { Material } from '@prisma/client';

export default function ClientMaterialForm({
  action,
  material,
}: {
  action: (formData: FormData) => void;
  material?: Material;
}) {
  console.log('Mamdms', material);
  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '10rem' }}
      action={action}
      // onSubmit={(e) => {
      //   // console me title
      //   const data = new FormData(e.target as HTMLFormElement);
      //   const title = data.get('title') as string;

      //   const explicit = checkExplicit(title);
      //   if (explicit) {
      //     e.preventDefault();
      //     alert(`Сам ты ${explicit}`);
      //     return;
      //   }
      // }}
    >
      <label htmlFor="title">Title</label>

      <input type="text" id="title" name="title" defaultValue={material?.title} />
      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" defaultValue={material?.description} />
      <label htmlFor="mediaUrl">Media URL</label>
      <input type="text" id="mediaUrl" name="mediaUrl" defaultValue={material?.mediaUrl} />
      <label htmlFor="Content">Content</label>
      <textarea id="content" name="content" defaultValue={material?.paragraph ?? ''} />

      <button type="submit">{material ? 'Edit' : 'Create'} Material</button>
    </form>
  );
}

// function checkExplicit(title: string): boolean | string {
//   const explicitWords = ['penis', 'hui'];

//   for (let word of explicitWords) {
//     if (title.toLowerCase().includes(word)) {
//       return word;
//     }
//   }

//   return false;
// }
