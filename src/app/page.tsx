"use client"
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useAppSelector((state) => state.auth.role);

  if (user) {
    redirect("/news-feed");
  } else {
    redirect("/login");
  }
}
