import { IUser } from "../users/user"
import { IReply } from "../replies/reply"

export interface IQuestion {
  questionId: number;
  id: string;
  title: string;
  content: string;
  created: Date;
  user: IUser;
  replies: IReply[];
}
