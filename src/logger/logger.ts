import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { BunyanLoggerService } from "@nest-toolbox/bunyan-logger";

export class TasksLogger implements LoggerService {

  private accessLog = fs.createWriteStream(path.resolve(__dirname, '../logs/access.log'), { encoding: 'utf-8', flags: 'a+' });
  private errorLog = fs.createWriteStream(path.resolve(__dirname, '../logs/error.log'), { encoding: 'utf-8', flags: 'a+' });
  private warnLog = fs.createWriteStream(path.resolve(__dirname, '../logs/warn.log'), { encoding: 'utf-8', flags: 'a+' });
  private debugLog = fs.createWriteStream(path.resolve(__dirname, '../logs/debug.log'), { encoding: 'utf-8', flags: 'a+' });
  private logger = new BunyanLoggerService({
    projectId: 'japjdklsk',
    formatterOptions: {
      outputMode: 'long'
    },
    extraFields: {
      environment:'development',
      microservice: 'tasks',
    },
    customStreams: [
      {
        level: 'trace',
        stream: this.accessLog
      },
      {
          level: 'error',
          stream: this.errorLog
      },
      {
        level: 'warn',
        stream: this.warnLog
      },
      {
        level: 'debug',
        stream: this.debugLog
      }
    ]
  });
  /*
  streams: [
      {
          level: 'trace',
          stream: this.accessLog
      },
      {
          level: 'error',
          stream: this.errorLog
      },
      {
        level: 'warn',
        stream: this.warnLog
      },
      {
        level: 'debug',
        stream: this.debugLog
      }
    ]
  */
  constructor() {
    
  }
 
  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(`${message}`);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(`${message}`);
  }

  debug?(message: any, ...optionalParams: any[]) {
    
  }
}