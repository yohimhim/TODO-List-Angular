export type TaskStatus = 'OPEN' | 'COMPLETED';

export interface Task {
  id: string;
  title: string;
  summary: string;
  dueDate: string;
  status?: TaskStatus;
}

export interface NewTaskData {
  title: string;
  summary: string;
  dueDate: string;
}