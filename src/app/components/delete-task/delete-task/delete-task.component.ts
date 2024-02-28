import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit{
  showSectionDeleteTask = true;
  taskId: number | null = null;

  constructor (private taskService: TaskService){ }

  ngOnInit() {
    this.taskService.taskDeleteRequested$.subscribe(taskId => {
      this.taskId = taskId;
    });
  }

  showOptions(){
    this.showSectionDeleteTask = true;
  }

  hideOptions(){
    this.showSectionDeleteTask = false;
  }

  deleteTask(){
    if (this.taskId) {
      try {
        this.taskService.deleteTask(this.taskId as unknown as Int16Array);
      } catch (error) {
        console.error (error)
      }
    }
  }
}
