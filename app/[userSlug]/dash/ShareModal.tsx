import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ShareIcon } from "lucide-react";
import { useState } from "react";

interface shareModalProps {
  blogSlug: string;
  userSlug: string;
}
export function ShareModal({ blogSlug, userSlug }: shareModalProps) {
  const [newSlug, setNewSlug] = useState(blogSlug);
  const [alertStatus, setAlertStatus] = useState(false);
  const checkSlugAvailability = (ip: string) => {
    fetch(`/api/user/${userSlug}/blog/${ip}`)
      .then((res) => {
        console.log(res.status === 404);
        if (res.status === 404) {
          setAlertStatus(false);
        } else {
          setAlertStatus(true);
        }
      })
      .catch((err) => {
        toast({ title: "Something went wrong", variant: "destructive" });
      });
  };

  const handleUpdateSlug = () => {
    if (blogSlug !== newSlug) {
      fetch(`/api/user/${userSlug}/blog/${blogSlug}`, {
        method: "PUT",
        body: JSON.stringify({ slug: newSlug }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast({ title: "Slug updated" });
        })
        .catch((err) => {
          toast({ title: "Something went wrong", variant: "destructive" });
        });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ShareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Blog</DialogTitle>
          <DialogDescription>
            {" Update the slug to make links more readable."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="">
              Slug
            </Label>
            <Input
              id="name"
              value={newSlug}
              className="w-full"
              onChange={(e) => {
                setAlertStatus(false);
                setNewSlug(e.target.value);
                checkSlugAvailability(e.target.value);
              }}
            />
          </div>
          {alertStatus ? (
            <p className="text-red-500 text-sm ml-12">Slug already taken</p>
          ) : null}
        </div>

        <div className="relative mt-3 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-center text-slate-800">
          <p>{`${window.location.protocol}://${window.location.host}/${userSlug}/${newSlug}`}</p>
        </div>

        <DialogFooter>
          <Button
            variant={"secondary"}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.protocol}://${window.location.host}/${userSlug}/${newSlug}`
              );
              toast({ title: "Copied to clipboard" });
            }}
          >
            Copy URL
          </Button>
          <Button onClick={() => handleUpdateSlug()} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
