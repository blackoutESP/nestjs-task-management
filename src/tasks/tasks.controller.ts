import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskDto, TaskStatus } from './dto/task-dto';
import { TasksService } from './tasks.service';
import { TasksLogger } from '../logger/logger';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService, private tasksLogger: TasksLogger) {

    }

    @Get()
    getTasks(@Res() response: Response, @Query() filter?: GetTasksFilterDto): Response<TaskDto[]> {
        if (filter.status) {
            const filtered: TaskDto[] = this.tasksService.get(filter);
            const controllerResponse = response.status(200).json({ok: true, data: filtered, error: []});
            this.tasksLogger.log(controllerResponse);
            return controllerResponse;
        } else if (filter.search) {
            const search: TaskDto[] = this.tasksService.get(filter);
            const controllerResponse = response.status(200).json({ok: true, data: [search], error: []});
            this.tasksLogger.log(controllerResponse);
            return controllerResponse;
        } else {
            const tasks = this.tasksService.get();
            const controllerResponse = response.status(200).json({ok: true, data: [tasks], error: []});
            this.tasksLogger.log(`${controllerResponse.statusCode} ${controllerResponse.statusMessage} ${controllerResponse.req.method} ${controllerResponse.req.url}`);
            return controllerResponse;
        }
    }

    /*
    @Body(key?: string)
    req.body / req.body[key]
    */
    @Post()
    postTask(@Req() request: Request, @Res() response: Response, @Body() body: TaskDto): Response {
        const serviceResponse = this.tasksService.post(body);
        const errorMessage = serviceResponse === null ? 'Task already exists...': '';
        return serviceResponse !== null ? 
                response.status(201).json({ok: true, data: [serviceResponse], error: []}) : 
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }

    @Patch('/:id')
    updateTask(@Req() request: Request, @Res() response: Response, @Body() body: TaskDto): Response<TaskDto> {
        const serviceResponse = this.tasksService.patch(body);
        const errorMessage = serviceResponse === null ? 'Entity equal to request.body, not updated.': '';
        return serviceResponse !== null ? 
                response.status(200).json({ok: true, data: [serviceResponse], error: []}) : 
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }

    @Patch('/:id/status')
    updateTaskStatus(@Res() response: Response, @Param('id') id: number, @Body('status') status: TaskStatus): Response<TaskDto> {
        const serviceResponse = this.tasksService.patchStatus(id, status);
        return response.status(200).json({ok: true, data: [serviceResponse]});
    }

    @Delete('/:id')
    deleteTask(@Req() request: Request, @Res() response: Response): Response {
        const serviceResponse = this.tasksService.delete(Number(request.params.id));
        const errorMessage = serviceResponse === false ? 'Entity not deleted.': '';
        return serviceResponse !== false ? 
                response.status(200).json({ok: true, data: [serviceResponse], error: []}) :
                response.status(200).json({ok: false, data: [], error: [errorMessage]});
    }
}
