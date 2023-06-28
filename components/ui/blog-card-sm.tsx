export interface BlogCardSmProps {
  id: string;
  title: string;
  createdAt: string;
  selectedBlog: any;
  setSelectedBlog: any;
}

export default function BlogCardSm({
  id,
  title,
  createdAt,
  setSelectedBlog,
  selectedBlog,
}: BlogCardSmProps) {
  const date = new Date(createdAt);
  const createdAtData = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div
      className={`${
        id === selectedBlog?.id ? "border-l-2 border-l-black" : ""
      } p-2 cursor-pointer`}
      onClick={() => setSelectedBlog({ id, title, createdAt })}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{createdAtData}</p>
      </div>
    </div>
  );
}
