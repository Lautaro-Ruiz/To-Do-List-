import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private taskDeleteRequestedSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  taskDeleteRequested$: Observable<number> = this.taskDeleteRequestedSubject.asObservable();

  private URL_getAllOrPostTask = "http://localhost:8092/tasks/"
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
      let tasks = await response.json();
      tasks = tasks.filter((task: Task) => !task.eliminated);
      this.tasksSubject.next(tasks);
    }catch (error){
      throw new Error('Ocurrió un error al procesar la solicitud GET' + error);
    }
  }

  async addTask (task:Task): Promise<boolean>{
    try {
      const response = await fetch (this.URL_getAllOrPostTask, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        },
        body: JSON.stringify(task)
      });
      if (response.ok){
        const newTask = await response.json()
        const currentTasks = this.tasksSubject.getValue();
        currentTasks.push(newTask);
        this.tasksSubject.next(currentTasks); //Actualizamos la lista de tareas a la que esta suscripta el task-list component.
        return true;
      }
      else
        throw new Error ('No se pudo agregar con eficacia la tarea.' + response.text);
    } catch (error) {
      throw new Error('Ocurrió un error al procesar la solicitud GET' + error);
    }
  }

  async updateTask (task:Task): Promise<Boolean>{
    console.log ('En metodo de service')
    console.log (task)
    try {
      const response = await fetch (this.URL_deleteOrUpdateTask+task.taskId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        },
        body:JSON.stringify(task)
      })
      if (response.ok)
        return true;
      else
        throw new Error('No se pudo actualizar con eficacia la tarea.' + response.text);
    } catch (error) {
      throw new Error('Ocurrió un error al procesar la solicitud GET' + error);
    }
  }

  async deleteTask (taskId: Int16Array){
    try {
      const response = await fetch (this.URL_deleteOrUpdateTask+taskId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json" // Indicar que el tipo de contenido es JSON
        }
      })
      if (response.ok){
        const updatedTasks = this.tasksSubject.getValue().filter(task => taskId !== task.taskId as unknown as Int16Array)
        this.tasksSubject.next(updatedTasks);
      }
      else
        throw new Error('No se pudo eliminar con eficacia la tarea' + response.text);
    } catch (error) {
      throw new Error('Ocurrió un error al procesar la solicitud DELETE' + error);
    }
  }

  emitTaskDeleteRequested(taskId: number) {
    this.taskDeleteRequestedSubject.next(taskId);
  }
}
