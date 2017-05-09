export interface Task {
  id: number;
  state: string;
  name: string;
  instruction: string;
  description?: string;
  respond?: string;
}
