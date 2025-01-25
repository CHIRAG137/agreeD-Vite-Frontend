import { format, parse } from "date-fns";

export function convertDateFormat(inputDate) {
  console.log(inputDate);
  const parsedDate = parse(inputDate, "MMMM d, yyyy", new Date());
  return format(parsedDate, "yyyy-MM-dd");
}
