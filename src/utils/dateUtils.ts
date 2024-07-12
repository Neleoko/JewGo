import {format} from "date-fns";
import {fr} from "date-fns/locale";

export function formateDate(date: string) {
    return format(date, "eeee dd MMM yyyy", {locale: fr});
}
export function formatTime(date: Date | string): string {
    return format(new Date(date), "HH'h'mm");
}
