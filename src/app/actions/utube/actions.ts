"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/worknest/utube-note/loginError");
  }

  revalidatePath("/worknest/utube-note", "layout");
  redirect("/worknest/utube-note/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return {
      success: null,
      error: null,
    };
  }

  return {
    success: true,
    error: null,
  };

  // redirect('/worknest/utube-note/loginError')
  // revalidatePath('/worknest/utube-note', 'layout')
  // redirect('/worknest/utube-note/account')
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

export async function updatePassword(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      success: null,
      error: true,
    };
  }

  return {
    success: true,
    error: null,
  };
}

export async function getSessionInfo() {
  const supabase = await createClient();
  return await supabase.auth.getSession();
}

export async function getUserInfo() {
  const supabase = await createClient();
  return await supabase.auth.getUser();
}
