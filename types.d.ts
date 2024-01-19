    export interface Todo {
  id : string;
  title: string;
  userId: string;
}

export interface Message {
  messageId: string;
  roomId: string;
  userId: string;
  username: string;
  message: string;
  createdAt: Date | string | number;

}