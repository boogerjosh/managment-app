import Card from "../../../../components/Card";

export default function DetailPageLoader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="w-full mx-5 flex">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 m-auto"></div>
      </Card>
    </div>
  );
}
