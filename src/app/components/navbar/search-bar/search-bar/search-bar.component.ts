import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit{
  taskList: Array<Task> = [];
  successList: Array<Task> = []; // Lista con las tareas que coincidan con la busqueda.
  searchControl = new FormControl ();

  flagDetails = false;
  result = '';

  constructor (private taskService: TaskService) { }

  async ngOnInit() {
    this.subscribeToShowTaskList ()
    this.searchControl.valueChanges.subscribe (taskName =>{
      this.searchTasksByName (taskName);
    })
  }

  subscribeToShowTaskList (){
    this.taskService.tasks$.subscribe(tasks => {
      this.taskList = tasks;
    })
  }

  searchTasksByName (taskName: String){
    this.successList = [];
    if (taskName && this.searchControl.value != ''){
      this.successList = this.taskList.filter ((task) =>{
        return task.name.toLowerCase().includes(taskName.toLowerCase());
      })
    }
    if (taskName != ''){
      if (this.successList.length == 0) 
        this.result = 'No hay resultados...'
    }else
      this.result = '';
  }

  showDetails (){
    this.flagDetails = !this.flagDetails;
  }
}
