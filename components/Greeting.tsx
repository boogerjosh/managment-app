import { getUserFromCookie } from "../lib/auth";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { delay } from "../lib/async";
import Image from "next/image";
import greetingsImg from "../assets/digital3d.png";

const getData = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());
  return user;
};

export default async function Greeting() {
  const user = await getData();

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName} {user?.lastName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today's Schedule</Button>
      </div>
      <Image
        src={greetingsImg}
        alt="Greetings Picture"
        className="absolute top-0 right-0"
        width={220}
        height={220}
        placeholder="blur"
      />
    </Card>
  );
};
