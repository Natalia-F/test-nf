'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/post-table");
  }, []);

  return null;
}

export default Main
