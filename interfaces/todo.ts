export enum todoStatus {
  todo,
  doing,
  done
};
export interface todo {
  id: string;
  toDoContent: string;
  toDoStatus: todoStatus;
}
export interface condition {
  id: string;
}
export interface conditions {
  id: string;
  toDoContent?: string;
  toDoStatus?: todoStatus;
}