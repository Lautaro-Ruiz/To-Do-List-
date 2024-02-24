import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: Array<Task> = []
  showList = false;
  firstLoad = true; // Bandera para controlar la primera carga, y asi no generar una peticion por cada vez que se agrega una tarea nueva.

  /* Generamos la inyeccion del servicio en el componente. */
  constructor (private taskService: TaskService){}

  async ngOnInit() {
    /*Generamos la peticion al iniciar la aplicacion para luego suscribirnos 
    y poder mostrar las tareas. Esto es para que cuando se agregue una nueva tarea, no se haga una
    peticion a la API para poder actualizar la lista, solo se ejecutaria lo que esta luego del if.*/
    if (this.firstLoad) {
      try {
        await this.taskService.fetchAllTasks(); 
      } catch (error) {
        console.error (error)
      }
      this.firstLoad = false; // Desactivamos la bandera después de la primera carga
    }
    this.taskService.tasks$.subscribe(tasks => {
      this.taskList = tasks;
      this.showList = true;
    })
  }
}
