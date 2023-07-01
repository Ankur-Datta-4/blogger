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

interface SidebarProps {
  setSelectedBlog: any;
  drafts: Blog[];
  published: Blog[];
  selectedBlog: any;
}
export default function Sidebar({
  setSelectedBlog,
  drafts,
  published,
  selectedBlog,
}: SidebarProps) {
  return (
    <nav className="fixed left-0 top-0 gap-4 max-w-96 p-4">
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
              {drafts.map((blog: Blog) => (
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
                />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
