import prisma from '../../../lib/prisma';
import { getUser } from '../utils/prismaUser';

export default async function WorkshopForm({ id }: { id?: string }) {
  const user = await getUser();
  if (!user) {
    return <h2>Not authenticated</h2>;
  }

  const workshop = id
    ? await prisma.workshop.findUnique({
        where: {
          id: id,
        },
      })
    : null;

  return !workshop && id ? (
    <h2>Workshop not found</h2>
  ) : (
    <>
      {workshop ? <h2>Edit Workshop {workshop.title}</h2> : <h2>Create Workshop</h2>}
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '10rem' }}
        action={
          workshop
            ? async (formData) => {
                // edit workshop
                'use server';
                const data = formData;
                const title = data.get('title');
                const description = data.get('description');
                const date = data.get('date');
                // const location = data.get('location');
                const workshop = await prisma.workshop.update({
                  where: {
                    id: id,
                  },
                  data: {
                    title: title as string,
                    description: description as string,
                    date: new Date(date as string),
                    // location: location as string,
                    authorId: user.id,
                  },
                });
                console.log(workshop);
              }
            : async (formData) => {
                'use server';
                const data = formData;
                const title = data.get('title');
                const description = data.get('description');
                const date = data.get('date');
                const workshop = await prisma.workshop.create({
                  data: {
                    title: title as string,
                    description: description as string,
                    date: new Date(date as string),
                    authorId: user.id,
                  },
                });
                console.log(workshop);
              }
        }
      >
        <input name="title" type="text" placeholder="Title" defaultValue={workshop?.title} />
        <input
          name="description"
          type="text"
          placeholder="Description"
          defaultValue={workshop?.description}
        />
        <input
          name="date"
          type="date"
          placeholder={new Date().toISOString().slice(0, 10)}
          defaultValue={workshop?.date.toISOString().slice(0, 10)}
        />
        {/* <input
          name="location"
          type="text"
          placeholder="Location"
          defaultValue={workshop?.location?.toString()}
        /> */}

        <button type="submit">{workshop ? 'Edit' : 'Create'}</button>
      </form>
    </>
  );
}
