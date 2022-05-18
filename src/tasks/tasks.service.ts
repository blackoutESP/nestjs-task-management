import { Injectable } from '@nestjs/common';
import { TaskDto, TaskStatus } from './dto/task-dto';
import { v4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {

    private tasks: TaskDto[] = [];

    get(filter?: GetTasksFilterDto): TaskDto[] {
        const { status, search } = filter;
        if (!filter) {
            return this.tasks;
        } else if (status) {
            return this.tasks.filter(t => t.status === filter.status);
        } else if (search) {
            return this.tasks.filter(t => t.title.includes(search) || t.description.includes(search) || t.status.includes(search) ? true : false);
        }
    }

    post(body: TaskDto): (TaskDto | null) {
        const originalLength = this.tasks.length;
        let newLength = 0;
        let newTask = {
            id: 0,
            title: '',
            description: '',
            status: TaskStatus.OPEN
        };
        const found = this.tasks.some(t => t.id === body.id && t.title === body.title && t.description === body.description);
        if (!found) {
            const task: TaskDto = {
                id: v4(),
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

    patchStatus(id: number, status: TaskStatus): TaskDto {
        const index = this.tasks.findIndex(t => t.id === id);
        this.tasks[index].status = status;
        return this.tasks[index];
    }

    delete(id: number): (TaskDto[] | boolean) {
        return this.tasks = this.tasks.filter(t => t.id !== id);
    }
}
