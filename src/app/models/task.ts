import { TaskPriority } from "./taskPriority";
import { TaskStatus } from "./taskStatus";

export class Task {
    taskID: Number = 0;
    name: String = '';
    description: String = '';
    status: TaskStatus = TaskStatus.TO_DO;
    priority: TaskPriority = TaskPriority.LOW;
    eliminated: Boolean = false;
}