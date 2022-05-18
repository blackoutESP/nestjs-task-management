import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';
import { v4 } from 'uuid';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    get(): Task[] {
        return this.tasks;
    }

    getById(id: string): (Task | null) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            return task;
        } else {
            return null;
        }
    }

    post(body: Task): (Task | null) {
        const originalLength = this.tasks.length;
        let newLength = 0;
        let newTask = {
            id: '',
            title: '',
            description: '',
            status: ''
        };
        const found = this.tasks.some(t => t.title === body.title && t.description === body.description && t.status === body.status);
        if (!found) {
            const task: Task = {
                id: String(v4()),
                title: body.title,
                description: body.description,
                status: body.status
            };
            newLength = this.tasks.push(task);
            newTask = task;
        }
        return newLength > originalLength ? newTask : null;
    }

    patch(body: Task): (Task | null) {
        const task = this.getById(body.id);
        if (task.title !== body.title || task.description !== body.description || task.status !== body.status) {
            const index = this.tasks.findIndex(t => t.id === body.id);
            this.tasks[index] = body;
            return body !== this.tasks[index] ? body : null;
        }
        return null;
    }
}
