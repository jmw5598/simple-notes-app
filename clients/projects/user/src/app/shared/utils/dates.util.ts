export function toDateTimePickerFormat(date: Date): string {
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();
  const hours: string = date.getHours().toString().padStart(2, '0');
  const minutes: string = date.getMinutes().toString().padStart(2, '0');
  const seconds: string = date.getSeconds().toString().padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}