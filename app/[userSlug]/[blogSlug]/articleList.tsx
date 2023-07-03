export default function ArticleList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blogs?.map((blog: Blog, index) => (
        <div className="" key={`blog-${index}`}>
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <p className="text-lg">
            {new Date(blog?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
