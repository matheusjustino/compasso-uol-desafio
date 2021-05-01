import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';

// MODULES
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [CityService],
	controllers: [CityController],
	exports: [CityService],
})
export class CityModule {}
