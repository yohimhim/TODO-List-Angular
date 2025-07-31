import { Injectable, signal } from "@angular/core";
import { NewTaskData, Task } from "./task/task.model";

@Injectable({providedIn: 'root'})
export class TasksService {
    private tasks = signal<Task[]>([
    {
      id: 't1',
      title: 'Master Angular',
      summary:
        'Learn all of Angular!',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      title: 'Buy Milk',
      summary: 'For my birthday cake',
      dueDate: '2025-10-02',
    },
  ]);

    getTasks = this.tasks.asReadonly();

    removeTask(id: string) {
        this.tasks.update(tasks => tasks.filter(task => task.id != id));
    }

    addTask(taskData: NewTaskData) {
        const newTask: Task = {
            id: Math.random().toString(),
            ...taskData
        };

        this.tasks.update(tasks => [...tasks, newTask]);
    }

    editTask(taskId: string, taskData: NewTaskData) {
      this.tasks.update(tasks => 
        tasks.map(task =>
          task.id === taskId ? { ...task, ...taskData } : task
        )
      )
    };

    updateTaskStatus(taskId: string) {
      this.tasks.update(tasks => 
        tasks.map(task =>
          task.id === taskId ? { 
            ...task,
            status: task.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED'
          } : task 
        )
      );
    }

}