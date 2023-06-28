import { SearchIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import BlogCardSm, { BlogCardSmProps } from "./blog-card-sm";
import { Blog } from "@/app/page";

interface SidebarProps {
  setSelectedBlog: any;
  blogs: Blog[];
  selectedBlog: any;
}
export default function Sidebar({
  setSelectedBlog,
  blogs,
  selectedBlog,
}: SidebarProps) {
  return (
    <nav className="absolute left-0 top-0 gap-4 max-w-96 p-4">
      <div className="flex gap-2">
        <Input placeholder="Search" />
        <Button>
          <SearchIcon />
        </Button>
      </div>
      <Accordion collapsible type="single">
        <AccordionItem value="drafts">
          <AccordionTrigger>Drafts</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              <li>Post 1</li>
              <li>Post 2</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="published">
          <AccordionTrigger>Published</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              {blogs.map((blog: Blog) => (
                <BlogCardSm
                  key={blog.id}
                  {...blog}
                  setSelectedBlog={setSelectedBlog}
                  selectedBlog={selectedBlog}
                />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
