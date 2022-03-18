import { Task } from "@prisma/client";
import { signOut } from "next-auth/react";
import { FormEvent, useState } from "react";
import { prisma } from "../../lib/prisma";

type TaskProps = {
  data: Task[];
};

export default function App({ data }: TaskProps) {
  const [newTask, setNewTask] = useState("");

  async function handleCreationTask(event: FormEvent) {
    event.preventDefault();

    await fetch("http://localhost:3000/api/tasks/create", {
      method: "POST",
      body: JSON.stringify({
        title: newTask,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div>
      <button className='' onClick={() => signOut()}>
        Log out
      </button>
      <p className='text-lg'>
        <ul>
          {data.map((task) => (
            <li key={task.id} className='text-4xl'>
              {task.title}
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreationTask}>
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type='submit'>New Task</button>
        </form>
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
