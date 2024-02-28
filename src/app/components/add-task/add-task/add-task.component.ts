import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { TaskPriority } from 'src/app/models/taskPriority';
import { TaskStatus } from 'src/app/models/taskStatus';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent {
  showFormAddTask = false;
  result: String = ''

  group_addTask = new FormGroup ({
    name: new FormControl (null, [Validators.required, Validators.nullValidator]),
    description: new FormControl (),
    status: new FormControl (null, Validators.required),
    priority: new FormControl (null, Validators.required)
  });

  statusOptions = ["TO_DO", "IN_PROGRESS", "DONE"];
  priorityOptions = ["LOW", "MEDIUM", "HIGH"];

  /* Generamos la inyeccion del servicio en el componente. */
  constructor (private taskService: TaskService){ }
  
  showForm (){
    this.showFormAddTask = true;
  }

  hideForm (){
    this.showFormAddTask = false;
  }

  async addTask (task: Task){
    if (task != null){
      try {
        this.showResult (await this.taskService.addTask(task))
      } catch (error) {
        console.error(error)
      }
    }
  }

  showResult (flag: boolean){
    this.showFormAddTask = false;
    if (flag)
      this.result = 'La tarea se agrego con exito!'
    else
      this.result = 'Hubo un error al agregar la tarea...'
    setTimeout (()=>{
      this.result = '';
    }, 2000);
  }

  get name (){ return this.group_addTask.get('name') }
  get description (){ return this.group_addTask.get('description') }
  get status (){ return this.group_addTask.get('status') }
  get priority (){ return this.group_addTask.get('priority') }

  onSubmit(){
    if (this.group_addTask.valid){
      let newTask = new Task();
      if (this.name && this.description && this.status && this.priority){
        newTask.description = this.description.value as unknown as String;
        newTask.name = this.name.value as unknown as String; 
        newTask.status = this.status.value as unknown as TaskStatus;
        newTask.priority = this.priority.value as unknown as TaskPriority; 
        this.addTask(newTask);
      }
    }
  }
}
