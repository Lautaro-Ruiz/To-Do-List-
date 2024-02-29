import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskPriority } from 'src/app/models/taskPriority';
import { SortedListService } from 'src/app/services/sorted-list.service';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrls: ['./priority-list.component.css']
})
export class PriorityListComponent {
  priorityList: Array<Task> = [];

  constructor (private taskService: TaskService,  private priorityListService: SortedListService) { }

  subscribeToShowPriorityList (ascendent: boolean){
    this.taskService.tasks$.subscribe(tasks => {
      this.priorityList = [...tasks];
      this.priorityList.sort((a, b) => this.compare(a.priority, b.priority, ascendent));
    });
    this.priorityListService.updateSortedPriorityList(this.priorityList); 
  }

  private compare(priorityA: TaskPriority, priorityB: TaskPriority, ascendent: boolean): number {
    let orderA = this.getOrder(priorityA);
    let orderB = this.getOrder(priorityB);
    return ascendent ? orderA - orderB : orderB - orderA;
  }

  private getOrder(priority: TaskPriority): number {
    switch (priority) {
      case TaskPriority.HIGH:
        return 1;
      case TaskPriority.MEDIUM:
        return 2;
      case TaskPriority.LOW:
        return 3;
      default:
        return 0;
    }
  }
}
