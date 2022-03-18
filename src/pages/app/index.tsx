import { signOut } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default function App({ data }) {
  return (
    <div>
      <h1 className=''>Hello World</h1>
      <button className='' onClick={() => signOut()}>
        Log out
      </button>
      <p className='text-lg'>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </p>
    </div>
  );
}

export const getServerSideProps = async () => {
  const tasks = await prisma.task.findMany();

  const data = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isDone: task.isDone,
      date: task.created_at.toISOString(),
    };
  });

  return {
    props: {
      data,
    },
  };
};
