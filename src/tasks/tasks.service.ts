import { Injectable } from '@nestjs/common';
import { TaskDto, TaskStatus } from './task-dto';
import { v4 } from 'uuid';

@Injectable()
export class TasksService {

    private tasks: TaskDto[] = [];

    get(): TaskDto[] {
        return this.tasks;
    }

    post(body: TaskDto): (TaskDto | null) {
        const originalLength = this.tasks.length;
        let newLength = 0;
        let newTask = {
            id: '',
            title: '',
            description: '',
            status: ''
        };
        const found = this.tasks.some(t => t.id === body.id && t.title === body.title && t.description === body.description && t.status === body.status);
        if (!found) {
            const task: TaskDto = {
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

    patch(body: TaskDto): (TaskDto | null) {
        const notFound = this.tasks.some(t => t.id === body.id && t.title === body.title && t.description === body.description && t.status === body.status);
        if (!notFound) {
            const index = this.tasks.findIndex(t => t.id === body.id);
            this.tasks[index] = body;
            return body;
        }
        return null;
    }

    delete(id: string): (TaskDto[] | boolean) {
        return this.tasks = this.tasks.filter(t => t.id !== id);
    }
}
