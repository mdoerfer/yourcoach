export class Task {
  from: string;
  to: string;
  title: string;
  description: string;
  difficulty: string;
  response: string;
  responseInstructions: string;
  created_at: number;
  updated_at: number;

  constructor() {
    let d = new Date().valueOf();

    this.created_at = d;
    this.updated_at = d;
  }
}
