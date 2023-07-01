import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SaveButtonProps {
  saved: Boolean;
}
export function Savebutton({ saved }: SaveButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={
              saved ? "bg-green-200 text-black" : "bg-gray-300 text-black"
            }
          >
            {saved ? "Saved" : "Saving"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{saved ? "Contents are saved" : "Syncing changes"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
