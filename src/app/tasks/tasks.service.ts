import { Injectable, signal } from "@angular/core";
import { Task } from "./task/task.model";

@Injectable({providedIn: 'root'})
export class TasksService {
    private tasks = signal<Task[]>([
    {
      id: 't1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

    getTasks = this.tasks.asReadonly();

    removeTask(id: string) {
        this.tasks.update(tasks => tasks.filter(task => task.id != id));
    }

}