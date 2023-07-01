import { SearchIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import BlogCardSm, {
  BlogCardSmProps,
} from "../../../components/ui/blog-card-sm";
import { toast } from "@/components/ui/use-toast";

interface SidebarProps {
  setSelectedBlog: any;
  drafts: Blog[];
  published: Blog[];
  selectedBlog: any;
  userSlug: string;
  mutateBlogs: any;
}
export default function Sidebar({
  setSelectedBlog,
  drafts,
  published,
  selectedBlog,
  userSlug,
  mutateBlogs,
}: SidebarProps) {
  const handleCreateNewBlog = () => {
    toast({ title: "Creating blog" });
    fetch(`/api/user/${userSlug}/blog`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(({ blog }) => {
        const { id, name, slug, isDraft, createdAt } = blog;
        setSelectedBlog({ id, name, slug, isDraft, createdAt });
        toast({ title: "Blog created" });
        mutateBlogs();
      })
      .catch((err) => {
        toast({ title: "Something went wrong", variant: "destructive" });
        console.log(err);
      });
  };
  return (
    <nav className="fixed left-0 top-0 gap-4 max-w-96 p-4">
      <div className="flex gap-2">
        <Input placeholder="Search" />
        <Button>
          <SearchIcon />
        </Button>
      </div>
      <Button className="my-4 w-full" onClick={handleCreateNewBlog}>
        + Blog
      </Button>
      <Accordion collapsible type="single">
        <AccordionItem value="drafts">
          <AccordionTrigger>Drafts</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              {drafts.map((blog: Blog) => (
                <BlogCardSm
                  key={blog.id}
                  {...blog}
                  setSelectedBlog={setSelectedBlog}
                  selectedBlog={selectedBlog}
                  mutateBlogs={mutateBlogs}
                  userSlug={userSlug}
                />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="published">
          <AccordionTrigger>Published</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              {published.map((blog: Blog) => (
                <BlogCardSm
                  key={blog.id}
                  {...blog}
                  setSelectedBlog={setSelectedBlog}
                  selectedBlog={selectedBlog}
                  mutateBlogs={mutateBlogs}
                  userSlug={userSlug}
                />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
