import { format } from "date-fns";
export const formatDate = (date: string): string => {
    return format(date, "ccc, d E");
};
// 2024-04-05T00:14 "YYYY-d-M-p"+ "T" + "p"
export const formatDateToForm = (date: string): string => {
    const dateF = format(date, "yyyy-dd-MM") + "T" + format(date, "kk:mm");
    return dateF;
};
