import Link from "next/link";

export default function ArticleList({
  blogs,
  userSlug,
}: {
  blogs: Blog[];
  userSlug: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {blogs?.map((blog: Blog, index) => (
        <Link href={`/${userSlug}/${blog?.slug}`} key={`blog-${index}`}>
          <div className="cursor-pointer bg-slate-50 hover:bg-slate-100 p-4 rounded-md">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="text-lg">
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
