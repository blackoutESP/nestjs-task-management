import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';
import { v4 } from 'uuid';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    postTask(taskBody: any): (Task | null) {
        const originalLength = this.tasks.length;
        let newLength = 0;
        let newTask = {
            id: 0,
            title: '',
            description: '',
            status: ''
        };
        const found = this.tasks.some(t => t.title === taskBody.title && t.description === taskBody.description && t.status === taskBody.status);
        if (!found) {
            const task: Task = {
                id: v4(),
                title: taskBody.title,
                description: taskBody.description,
                status: taskBody.status
            };
            newLength = this.tasks.push(task);
            newTask = task;
        }
        return newLength > originalLength ? newTask : null;
    }
}
