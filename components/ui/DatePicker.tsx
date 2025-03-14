import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  onChange,
  error,
  isDirty,
}: {
  date?: Date;
  onChange: (date?: Date) => void;
  error: boolean;
  isDirty: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-[320px]  border-[#CED4DA] !ring-0 justify-start text-left font-normal !date && "text-muted-foreground ${
            !error ? "border-red" : isDirty ? "border-green-500" : ""
          }`}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// cn(
//   "w-[320px]  border-[#CED4DA] !ring-0 justify-start text-left font-normal",
//   !date && "text-muted-foreground"
// )
