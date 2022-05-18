import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksLogger } from '../logger/logger';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TasksLogger
  ]
})
export class TasksModule {}
