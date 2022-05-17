import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    postTask(task: Task): (Task | null) {
        
        this.tasks.push(task);
        const find = this.tasks.find(t => t.title === task.title && t.description === task.description && t.status === task.status);
        return (find !== task ? null: task);
    }
}
