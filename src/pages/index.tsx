import { ReactElement, useEffect, useState } from "react";
import Dexie from "dexie";
import { useRouter } from "next/router";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ats/wiki");
  }, [router]);

  return <></>;
}
