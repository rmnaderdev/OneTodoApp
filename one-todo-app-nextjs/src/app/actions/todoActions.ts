'use server';

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function addTodo(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const content = formData.get('content') as string;

  if (!content || content.trim() === "") {
    return;
  }

  const defaultList = await prisma.todoList.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', title: 'Default List', userId: session.user.id },
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
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const id = formData.get('id') as string;
  const completed = formData.get('completed') === 'true';

  console.log('Toggling todo:', { id, completed });

  await prisma.todoItem.update({
    where: { id, list: { userId: session.user.id } },
    data: {
      completed,
    },
  });

  revalidatePath('/');
}

export async function deleteTodo(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const id = formData.get('id') as string;
  await prisma.todoItem.update({
    where: { id, list: { userId: session.user.id } },
    data: {
      deleted: true,
    },
  });
  
  revalidatePath('/');
}