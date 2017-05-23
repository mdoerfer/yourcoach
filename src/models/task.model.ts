import {AuthService} from "../services/auth.service";
export class Task {
  _id: string;
  state: string;
  title: string;
  description: string;
  responseType: string;
  response: any;
  difficulty: string;
  rating: number;
  from: string;
  to: string;
  created_at: number;
  updated_at: number;
}
