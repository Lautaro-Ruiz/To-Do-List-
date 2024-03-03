import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ListOfSearchedTasksService {
  private listOfTaskSearched: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  listOfTaskSearched$ = this.listOfTaskSearched.asObservable();

  constructor() { }

  updateTaskList(taskList: Task[]) {
    this.listOfTaskSearched.next(taskList);
  }
}
