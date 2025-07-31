import { effect, Injectable, signal } from "@angular/core";
import { NewTaskData, Task } from "./task/task.model";

@Injectable({providedIn: 'root'})
export class TasksService {
    private tasks = signal<Task[]>([
    // {
    //   id: 't1',
    //   title: 'Master Angular',
    //   summary:
    //     'Learn all of Angular!',
    //   dueDate: '2025-12-31',
    // },
    // {
    //   id: 't2',
    //   title: 'Buy Milk',
    //   summary: 'For my birthday cake',
    //   dueDate: '2025-10-02',
    // },
  ]);

  constructor() {
    const localTasks = localStorage.getItem('tasks');

    if (localTasks) {
      try {
        this.tasks.set(JSON.parse(localTasks));
      } catch (err) {
        console.log('cannot parse from local storage...');
      }
    }

    effect(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    });

  }

    getTasks = this.tasks.asReadonly();

    removeTask(id: string) {
        this.tasks.update(tasks => tasks.filter(task => task.id != id));
        this.saveTasks();
    }

    addTask(taskData: NewTaskData) {
        const newTask: Task = {
            id: Math.random().toString(),
            ...taskData
        };

        this.tasks.update(tasks => [...tasks, newTask]);
        this.saveTasks();
    }

    editTask(taskId: string, taskData: NewTaskData) {
      this.tasks.update(tasks => 
        tasks.map(task =>
          task.id === taskId ? { ...task, ...taskData } : task
        )
      )
      this.saveTasks();
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
      this.saveTasks();
    }

    private saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    }

}