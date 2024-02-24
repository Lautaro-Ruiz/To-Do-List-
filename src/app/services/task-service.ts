import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private URL_getAllOrPostTask = "http://localhost:8092/tasks/"
  private URL_getAllTaskByPriority = "http://localhost:8092/tasks/priority"
  private URL_getAllTaskByStatus = "http://localhost:8092/tasks/status"
  private URL_deleteOrUpdateTask = "http://localhost:8092/tasks/"

  constructor() { }

  getAllTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable().pipe(
      catchError(error => {
        throw new Error (error);
      })
    );
  }

  async fetchAllTasks (): Promise<void> {
    try{
      const response = await fetch (this.URL_getAllOrPostTask, {
        method: "GET",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        }
      });
      if (response.status === 204) 
        throw new Error ('No hay contenido...');
      if (!response.ok)
        throw new Error ('Ha ocurrido un error al cargar las tareas.');
      const tasks = await response.json();
      this.tasksSubject.next(tasks);
    }catch (error){
      throw new Error('Ocurrió un error al procesar la solicitud GET' + error);
    }
  }

  async fetchAllTasksByPriority (priority:String): Promise<Array<Task>>{
    try{
      const response = await fetch ((this.URL_getAllTaskByPriority+"?priority="+priority), {
        method: "GET",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        }
      });
      if (response.status === 204) 
        throw new Error ('No hay contenido...');
      if (!response.ok)
        throw new Error ('Ha ocurrido un error al cargar las tareas.');
      return await response.json();
    }catch (error){
      throw new Error('Ocurrió un error al procesar la solicitud GET' + error);
    }
  }

  async fetchAllTasksByStatus (status:String): Promise<Array<Task>>{
    try{
      const response = await fetch ((this.URL_getAllTaskByStatus+"?status="+status), {
        method: "GET",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        }
      });
      if (response.status === 204) 
        throw new Error ('No hay contenido...');
      if (!response.ok)
        throw new Error ('Ha ocurrido un error al cargar las tareas.');
      return await response.json();
    }catch (error){
      throw new Error('Ocurrió un error al procesar la solicitud GET' + error);
    }
  }

  async addTask (task:Task){
    try {
      const response = await fetch (this.URL_getAllOrPostTask, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        },
        body: JSON.stringify(task)
      });
      if (response.ok){
        const currentTasks = this.tasksSubject.getValue();
        currentTasks.push(task);
        this.tasksSubject.next(currentTasks); //Actualizamos la lista de tareas a la que esta suscripta el task-list component.
      }
      else
        throw new Error ('No se pudo agregar con eficacia la tarea.' + response.text);
    } catch (error) {
      throw new Error('Ocurrió un error al procesar la solicitud GET' + error);
    }
  }

  async updateTask (taskId: Int16Array, task:Task): Promise<Boolean>{
    try {
      const response = await fetch (this.URL_deleteOrUpdateTask+taskId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        },
        body:JSON.stringify(task)
      })
      if (response.ok)
        return true;
      else{
        console.error ("No se pudo actualizar con eficacia la tarea.", response.text);
        return false;
      }
    } catch (error) {
      console.error('Ocurrió un error al procesar la solicitud PUT:', error);
      return false;
    }
  }

  async deleteTask (taskId: Int16Array): Promise<Boolean>{
    try {
      const response = await fetch (this.URL_deleteOrUpdateTask+taskId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        }
      })
      if (response.ok)
        return true;
      else{
        console.error ("No se pudo eliminar con eficacia la tarea.", response.text);
        return false;
      }
    } catch (error) {
      console.error('Ocurrió un error al procesar la solicitud DELETE:', error);
      return false;
    }
  }
}
