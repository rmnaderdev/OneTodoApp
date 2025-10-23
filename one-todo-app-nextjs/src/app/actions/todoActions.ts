'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const content = formData.get('content') as string;

  if (!content || content.trim() === "") {
    return;
  }

  const defaultList = await prisma.todoList.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', title: 'Default List' },
  });

  await prisma.todoItem.create({
    data: {
      listId: defaultList.id,
      content: content ?? "",
      completed: false,
    },
  });

  revalidatePath('/');
}

export async function toggleTodo(formData: FormData) {
  const id = formData.get('id') as string;
  const completed = formData.get('completed') === 'true';

  console.log('Toggling todo:', { id, completed });

  await prisma.todoItem.update({
    where: { id },
    data: {
      completed,
    },
  });

  revalidatePath('/');
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.todoItem.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
  revalidatePath('/');
}