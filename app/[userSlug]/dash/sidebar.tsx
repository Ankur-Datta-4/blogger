import { GripVertical, SearchIcon } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";

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
  const session = useSession();
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
    <nav className="fixed left-0 top-0 gap-4 max-w-96 p-4 hidden sm:block">
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
            <ul className="flex flex-col gap-2 max-h-[500px]">
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
      <div className="relative">
        <div className="w-full flex items-center gap-4 p-2">
          <Avatar>
            <AvatarImage src={session.data?.user.image as string} />
            <AvatarFallback>
              {session.data?.user.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>{session.data?.user.name?.split(" ")[0]}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                <GripVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/${userSlug}/dash/profile`}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  signOut({
                    callbackUrl: "/",
                  });
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
