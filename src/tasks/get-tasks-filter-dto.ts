import { TaskDto, TaskStatus } from './task-dto';

export class GetTasksFilterDto {
    status: TaskStatus;
    search: string;
}
