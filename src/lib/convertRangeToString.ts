import { format } from "date-fns";

export function convertRangeToString(
  range:
    | {
        from: Date | undefined;
        to?: Date | undefined;
      }
    | undefined
) {
  if (!range) return "Pick a date";
  if (!range.from) return "Pick a date";
  if (!range.to) return format(range.from, "P");
  if (range.from.getTime() === range.to.getTime())
    return format(range.from, "P");
  return `${format(range.from, "P")} - ${format(range.to, "P")}`;
}
