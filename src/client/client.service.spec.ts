import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

// MODULES

import { DatabaseModule } from '../database/database.module';
// MONGOOSE TEST
import {
	rootMongooseTestModule,
	closeInMongodConnection,
} from '../common/root-mongoose-test/root-mongoose-test.module';

// ENUM's
import { Sex } from '../common/enums/sex.enum';

// SCHEMAS
import { CityDocument } from '../database/schemas/city.schema';

// REPOSITORIES
import { CityRepository } from '../database/repositories/city.repository';
import { ClientRepository } from '../database/repositories/client.repository';

// MODELS PROVIDER
import { modelsProviderAsync } from '../database/models-provider';

// SERVICES
import { ClientService } from './client.service';
import { CityService } from '../city/city.service';

// DTO's
import { ClientQueryDto } from './dtos/client-query.dto';
import { ClientUpdateDto } from './dtos/client-update.dto';
import { ClientCreateDto } from './dtos/client-create.dto';
import { CityDto } from '../city/dto/city-create.dto';

describe('ClientService', () => {
	let clientService: ClientService;
	let cityService: CityService;
	let cityMock: CityDocument;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				DatabaseModule,
				MongooseModule.forFeatureAsync(modelsProviderAsync),
			],
			providers: [
				CityRepository,
				ClientRepository,
				CityService,
				ClientService,
			],
		}).compile();

		clientService = module.get<ClientService>(ClientService);
		cityService = module.get<CityService>(CityService);
	});

	beforeEach(async () => {
		const cityDto: CityDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		cityMock = await cityService.create(cityDto).toPromise();
	});

	afterAll(async () => {
		await closeInMongodConnection();
	});

	it('should be defined', () => {
		expect(clientService).toBeDefined();
		expect(cityService).toBeDefined();
	});

	it('CREATE - should be created a Client', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};

		const client = await clientService.create(clientDto).toPromise();

		expect(client.city).toBe(cityMock._id);
		expect(client.name).toBe(clientDto.name);
		expect(client.sex).toBe(clientDto.sex);
	});

	it('CREATE - shouldnt be created a Client', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: null,
		};

		await expect(
			clientService.create(clientDto).toPromise(),
		).rejects.toThrow('City does not exist');
	});

	it('UPDATE - should to update a Client', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};

		const clientUpdateDto: ClientUpdateDto = {
			name: 'Matheus Henrique Fernandes Justino',
		};

		const client = await clientService.create(clientDto).toPromise();
		expect(client.name).toBe(clientDto.name);

		const updatedClient = await clientService
			.update(client._id, clientUpdateDto)
			.toPromise();
		expect(updatedClient.name).toBe(clientUpdateDto.name);
	});

	it('GET - should be returned a Client by id', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};
		const client = await clientService.create(clientDto).toPromise();

		const findClient = await clientService.findById(client._id).toPromise();

		expect(client._id).toStrictEqual(findClient._id);
	});

	it('GET - should be return a Client array by query', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};
		const client = await clientService.create(clientDto).toPromise();

		const query: ClientQueryDto = {
			name: 'Matheus Henrique',
		};

		const emptyQuery: ClientQueryDto = {};

		const wrongValueQuery: ClientQueryDto = {
			name: 'Ana Carolina',
		};

		const findClientWithQuery = await clientService
			.findBy(query)
			.toPromise();

		const findClientWithEmptyQuery = await clientService
			.findBy(emptyQuery)
			.toPromise();

		const findClientWithWrongValueQuery = await clientService
			.findBy(wrongValueQuery)
			.toPromise();

		expect(findClientWithQuery.length > 0).toBe(true);
		expect(findClientWithEmptyQuery.length > 0).toBe(true);
		expect(findClientWithWrongValueQuery.length > 0).toBe(false);
		expect(findClientWithWrongValueQuery).toStrictEqual([]);
		expect(findClientWithQuery[0]._id).toStrictEqual(client._id);
	});
});
