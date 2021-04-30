import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './app-config/app-config.module';
import { CityModule } from './city/city.module';
import { ClientModule } from './client/client.module';

@Module({
	imports: [DatabaseModule, AppConfigModule, CityModule, ClientModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
