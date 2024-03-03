import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { ListOfSearchedTasksService } from 'src/app/services/list-of-searched-tasks.service';
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

  constructor (private taskService: TaskService, private listOfSearchedTask: ListOfSearchedTasksService) { }

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
    if (taskName && taskName.trim() !== ''){
      this.successList = this.taskList.filter ((task) =>{
        return task.name.toLowerCase().includes(taskName.toLowerCase());
      })
    }
    if (this.searchControl.value !== '' && this.successList.length == 0){ /* Si esta buscando y no hay nada */
      let task = new Task();
      task.name = "NO-CONTENT";
      const array: Array<Task> = [task];
      this.listOfSearchedTask.updateTaskList (array);
    }
    if (taskName === '') /* Si dejo de buscar */
      this.listOfSearchedTask.updateTaskList(this.taskList);
    this.listOfSearchedTask.updateTaskList(this.successList); /* Si esta buscando y hay resultados */
  }
}
