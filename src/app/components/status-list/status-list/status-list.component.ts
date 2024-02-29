import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskStatus } from 'src/app/models/taskStatus';
import { SortedListService } from 'src/app/services/sorted-list.service';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent {
  statusList: Array<Task> = [];

  constructor (private taskService: TaskService,  private sortedStatusList: SortedListService) { }

  subscribeToShowStatusList (ascendent: boolean){
    this.taskService.tasks$.subscribe(tasks => {
      this.statusList = [...tasks];
      this.statusList.sort((a, b) => this.compare(a.status, b.status, ascendent));
    });
    this.sortedStatusList.updateSortedStatusList(this.statusList); 
  }

  private compare(statusA: TaskStatus, statusB: TaskStatus, ascendent: boolean): number {
    let orderA = this.getOrder(statusA);
    let orderB = this.getOrder(statusB);
    return ascendent ? orderA - orderB : orderB - orderA;
  }

  private getOrder(status: TaskStatus): number {
    switch (status) {
      case TaskStatus.DONE:
        return 1;
      case TaskStatus.IN_PROGRESS:
        return 2;
      case TaskStatus.TO_DO:
        return 3;
      default:
        return 0;
    }
  }
}
