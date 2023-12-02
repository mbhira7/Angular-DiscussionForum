import { IUser } from "../users/user"

export interface IReply {
  replyId: number;
  content: string;
  created: Date;
  questionId: number;
  id: string;
  user: IUser;
}
