import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// MODULES
import { AppConfigModule } from '../app-config/app-config.module';

// SERVICES
import { AppConfigService } from '../app-config/app-config.service';

// PROVIDERS
import { modelsProviderAsync } from './models-provider';

// REPOSITORIES
import { CityRepository } from './repositories/city.repository';
import { ClientRepository } from './repositories/client.repository';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				uri: appConfigService.databaseUrl,
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}),
			inject: [AppConfigService],
		}),
		MongooseModule.forFeatureAsync(modelsProviderAsync),
	],
	providers: [CityRepository, ClientRepository],
	exports: [CityRepository, ClientRepository],
})
export class DatabaseModule {}
