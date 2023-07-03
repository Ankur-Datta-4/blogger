export default function ErrorPage({ error }: { error: any }) {
  let mainText = "Something went wrong";
  if (error?.response?.status === 404) {
    mainText = error?.response?.data?.message;
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-2xl text-center">{mainText}</div>
    </div>
  );
}
