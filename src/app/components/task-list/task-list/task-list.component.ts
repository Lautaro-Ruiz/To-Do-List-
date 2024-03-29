import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskPriority } from 'src/app/models/taskPriority';
import { TaskStatus } from 'src/app/models/taskStatus';
import { TaskService } from 'src/app/services/task-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { SortedListService } from 'src/app/services/sorted-list.service';
import { ListOfSearchedTasksService } from 'src/app/services/list-of-searched-tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  taskList: Array<Task> = []
  showList = true;
  firstLoad = true; // Bandera para controlar la primera carga, y asi no generar una peticion por cada vez que se agrega una tarea nueva.
  
  taskIdToDelete: number | null = null;

  editingTask: Task | null = null;
  originalTask: Task | null = null;
  taskStatusOptions: Array<TaskStatus> = Object.values(TaskStatus);
  taskPriorityOptions: Array<TaskPriority> = Object.values(TaskPriority);
  isEditing = false;
  refreshList: boolean = false;
  temporaryStatus: TaskStatus | null = null;
  temporaryPriority: TaskPriority | null = null;

  taskListNoContent= false;
  taskListNoCreated=true;
  
  constructor (private taskService: TaskService, private sortedListService: SortedListService, private listOfSearchedTask: ListOfSearchedTasksService){}

  async ngOnInit() {
    if (this.firstLoad) {
      try {
        await this.taskService.fetchAllTasks(); 
      } catch (error) {
        console.error (error)
      }
      this.firstLoad = false;
      if (this.taskList.length > 0) this.taskListNoCreated = false;
      else this.taskListNoCreated = true
    }
    this.subscribeToShowTaskList ();
    this.subscribeToShowSortedPriorityTaskList ();
    this.subscribeToShowSortedStatusTaskList();
    this.subscribeToShowListOfTaskSearched ();
    console.log ('lista apenas entra a app')
    console.log (this.taskList)
  }

  subscribeToShowTaskList (){
    this.taskService.tasks$.subscribe(tasks => {
      this.taskList = tasks;
      this.showList = true;
      this.updateTaskListNoCreated();
    });
  }

  subscribeToShowSortedPriorityTaskList() {
    this.sortedListService.sortedPriorityList$.subscribe(sortedList => {
      if (sortedList.length > 0) 
        this.taskList = sortedList;
        this.showList = true;
        this.updateTaskListNoCreated();
    });
  }

  subscribeToShowSortedStatusTaskList() {
    this.sortedListService.sortedStatusList$.subscribe(sortedList => {
      if (sortedList.length > 0) 
        this.taskList = sortedList;
        this.showList = true;
        this.updateTaskListNoCreated();
    });
  }

  subscribeToShowListOfTaskSearched (){
    this.listOfSearchedTask.listOfTaskSearched$.subscribe((updatedList) => {
      if (updatedList[0] != undefined && updatedList[0].name == "NO-CONTENT"){
        this.taskListNoContent = true;
        setTimeout (()=>{
          this.taskListNoContent = false;
        }, 2000)
      } else if (updatedList && updatedList.length > 0) {
        this.taskList = updatedList;
        this.showList = true;
        this.taskListNoContent = false;
      }
    });
  }

  deleteTask (task:Task){
    this.taskIdToDelete = task.taskId;
    this.taskService.emitTaskDeleteRequested(task.taskId); 
    if (this.taskList.length == 0) this.taskListNoCreated = true
  }

  updateTaskListNoCreated() {
    this.taskListNoCreated = this.taskList.length === 0;
  }

  /* COMIENZA SECCION DE EDICION DE TAREAS */
  /* ***************************************************************************************** */

  editTask(task: Task) {
    this.enableEditOptions()
    this.editingTask = task;
    this.originalTask = { ...task };
  }

  async saveChanges(task: Task): Promise<boolean>  {
    const editedFields = ['name', 'description'];
    editedFields.forEach(fieldName => {
      const fieldElement = document.getElementById(`${fieldName}`);
      if (fieldElement) {
        const newValue = fieldElement.innerText.trim();
        if (fieldName === 'name')
          task.name = newValue;
        else
          task.description = newValue;
      }
    });

    if (this.temporaryStatus){  /* Si es distinto de null, hay que actualizar su valor */
      console.log (this.taskList)
      task.status = this.temporaryStatus;
      this.temporaryStatus=null;
      console.log (this.taskList)
    }
    if (this.temporaryPriority){ /* Si es distinto de null, hay que actualizar su valor */
      task.priority = this.temporaryPriority;
      this.temporaryPriority=null;
    }

    try {
      await this.taskService.updateTask(task);
      console.log ('luego de update')
      console.log (this.taskList)
      this.disableEditOptions();
      this.editingTask = null;
      this.originalTask = null;
      return true;
    } catch (error) {
      console.error (error)
      return false;
    }
  }

  refreshTaskList () {
    this.refreshList = true;
    setTimeout(() => {
      this.refreshList = false;
    }, 0);
  }

  cancelEdit() {
    this.disableEditOptions()
    if (this.originalTask) {
      this.editingTask = { ...this.originalTask };
    }
    this.editingTask = null;
    this.originalTask = null;
    this.taskIdToDelete = null; 
    this.refreshTaskList ();
  }

  enableEditOptions() {
    // Habilitar la edición de opciones (prioridad y estado)
    let editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element: Element) => {
      const selectElement = element as HTMLElement
      selectElement.contentEditable = 'true';
    });
    this.isEditing = true;
  }

  disableEditOptions() {
    // Deshabilitar la edición de opciones (prioridad y estado)
    let editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element: Element) => {
      const selectElement = element as HTMLElement
      selectElement.contentEditable = 'false';
    });
    this.isEditing = false;
  }

  /* FINALIZA SECCION DE EDICION DE TAREAS */
  /* **************************************************************************************** */
}
