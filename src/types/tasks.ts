export type Category =
  | "Work"
  | "Personal"
  | "Study";

export interface Task {
  id: number;
  title: string;
  category: Category;
  completed: boolean;
}