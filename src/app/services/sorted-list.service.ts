import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})

export class SortedListService {
  private sortedPriorityListSource = new BehaviorSubject<Array<Task>>([]);
  sortedPriorityList$ = this.sortedPriorityListSource.asObservable();

  private sortedStatusListSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public sortedStatusList$ = this.sortedStatusListSubject.asObservable();

  constructor() { }

  updateSortedPriorityList(sortedList: Array<Task>) {
    this.sortedPriorityListSource.next(sortedList);
  }

  updateSortedStatusList(tasks: Array<Task>): void {
    this.sortedStatusListSubject.next(tasks);
  }
}
