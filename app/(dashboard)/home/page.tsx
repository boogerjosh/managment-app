import { delay } from "../../../lib/async";
import { getUserFromCookie } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Greeting from "../../../components/Greeting";
import GreetingsSkeleton from "../../../components/GreetingsSkeleton";
import MainHomeSection from "../../../components/MainHomeSection";

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

export default async function Page() {
  const { projects } = await getData();

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden w-full px-5">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <MainHomeSection projects={projects} />
      </div>
    </div>
  );
}
