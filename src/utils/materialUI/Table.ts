export interface Column {
  id: "assigner" | "date" | "description";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
export interface Data {
  id: string;
  assigner: string;
  date: string;
  description: string;
}
