import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private tasks: Array<Task> = [];
  private URL_getAllOrPostTask = "http://localhost:8092/tasks/"
  private URL_getAllTaskByPriority = "http://localhost:8092/tasks/priority"
  private URL_getAllTaskByStatus = "http://localhost:8092/tasks/status"
  private URL_deleteOrUpdateTask = "http://localhost:8092/tasks/"

  constructor() { }

  async getAllTasks (): Promise<Array<Task>|null>{
    try{
      const response = await fetch (this.URL_getAllOrPostTask, {
        method: "GET"
      });
      if (!response.ok){ 
        console.error (response.text);
        return null;
      }
      this.tasks = await response.json();
      return this.tasks;
    }catch (error){
      console.error('Ocurrió un error al procesar la solicitud GET:', error);
      return null
    }
  }

  async getAllTasksByPriority (priority:String): Promise<Array<Task>|null>{
    try{
      const response = await fetch ((this.URL_getAllTaskByPriority+"?priority="+priority), {
        method: "GET"
      });
      if (!response.ok){ 
        console.error (response.text);
        return null;
      }
      this.tasks = await response.json();
      return this.tasks;
    }catch (error){
      console.error('Ocurrió un error al procesar la solicitud GET:', error);
      return null;
    }
  }

  async getAllTasksByStatus (status:String): Promise<Array<Task>|null>{
    try{
      const response = await fetch ((this.URL_getAllTaskByStatus+"?status="+status), {
        method: "GET"
      });
      if (!response.ok){ 
        console.error (response.text);
        return null;
      }
      this.tasks = await response.json();
      return this.tasks;
    }catch (error){
      console.error('Ocurrió un error al procesar la solicitud GET:', error);
      return null;
    }
  }

  async addTask (task:Task): Promise<Boolean>{
    try {
      const response = await fetch (this.URL_getAllOrPostTask, {
        method: "POST",
        body: JSON.stringify(task)
      });
      if (response.ok)
        return true;
      else{
        console.error ("No se pudo agregar con eficacia la tarea.", response.text);
        return false;
      }
    } catch (error) {
      console.error('Ocurrió un error al procesar la solicitud POST:', error);
      return false;
    }
  }

  async updateTask (taskId: Int16Array, task:Task): Promise<Boolean>{
    try {
      const response = await fetch (this.URL_deleteOrUpdateTask+taskId, {
        method: "PUT",
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
        method: "DELETE"
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
