import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/shared/task';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'password',
			database: 'test',
			entities: [Task],
			synchronize: true,
			autoLoadEntities: true,
			dropSchema: true,
		}),
		TasksModule
	],
	controllers: [AppController],
	providers: [AppService,],
})
export class AppModule { }
