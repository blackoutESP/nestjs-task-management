import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    postTask(task: Task): Task {
        
        this.tasks.push(task);
        return task;
    }
}
