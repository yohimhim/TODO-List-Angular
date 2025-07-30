import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from './task.model';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [EditTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input({ required: true }) task!: Task;
    @Output() delete = new EventEmitter<string>();

    isEditingTask = false;

    private tasksService = inject(TasksService);

    onCompleteTask() {

    }

    onDeleteTask() {
      this.delete.emit(this.task.id);
    }

    onEditTask() {
      this.isEditingTask = true;
    }

    onCancelEdit() {
      this.isEditingTask = false;
    }

    onSaveEdit() {
      this.tasksService
      this.isEditingTask = false;
    }
}