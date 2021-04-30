import { AsyncModelFactory } from '@nestjs/mongoose';

// SCHEMAS
import { Client, ClientSchema } from './schemas/client.schema';
import { City, CitySchema } from './schemas/city.schema';

export const modelsProviderAsync: AsyncModelFactory[] = [
	{
		name: Client.name,
		collection: 'clients',
		useFactory: () => ClientSchema,
	},
	{
		name: City.name,
		collection: 'cities',
		useFactory: () => CitySchema,
	},
];
