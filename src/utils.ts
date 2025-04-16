import { format } from "date-fns";

export function formatSize(bytes: number, locale = "ru-RU"): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return (
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 2,
    }).format(size) +
    " " +
    units[unitIndex]
  );
}

export function formatDate(date: Date) {
  return format(date, "dd.MM.yyyy HH:mm");
}
