import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
	imports: [DatabaseModule, AppConfigModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
