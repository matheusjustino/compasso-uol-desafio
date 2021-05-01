import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

// MODULES
import { DatabaseModule } from '../database/database.module';
import { CityModule } from '../city/city.module';

@Module({
	imports: [DatabaseModule, CityModule],
	providers: [ClientService],
	controllers: [ClientController],
})
export class ClientModule {}
