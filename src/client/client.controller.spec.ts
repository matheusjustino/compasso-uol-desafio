import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

import { DatabaseModule } from '../database/database.module';
import { ClientController } from './client.controller';

// MONGOOSE TEST
import {
	rootMongooseTestModule,
	closeInMongodConnection,
} from '../common/root-mongoose-test/root-mongoose-test.module';

// REPOSITORIES
import { CityDocument } from '../database/schemas/city.schema';

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
import { Sex } from '../common/enums/sex.enum';

describe('Client Controller', () => {
	let clientController: ClientController;
	let cityService: CityService;
	let cityMock: CityDocument;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				DatabaseModule,
				MongooseModule.forFeatureAsync(modelsProviderAsync),
			],
			controllers: [ClientController],
			providers: [ClientService, CityService],
		}).compile();

		clientController = module.get<ClientController>(ClientController);
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
		expect(clientController).toBeDefined();
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

		const client = await clientController.create(clientDto).toPromise();

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
			clientController.create(clientDto).toPromise(),
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

		const client = await clientController.create(clientDto).toPromise();
		expect(client.name).toBe(clientDto.name);

		const updatedClient = await clientController
			.update(client._id, clientUpdateDto)
			.toPromise();
		expect(updatedClient.name).toBe(clientUpdateDto.name);
	});

	it('UPDATE - shouldnt to update a Client', async () => {
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

		const client = await clientController.create(clientDto).toPromise();
		expect(client.name).toBe(clientDto.name);

		const newClientId = new Types.ObjectId();

		await expect(
			clientController
				.update(newClientId.toString(), clientUpdateDto)
				.toPromise(),
		).rejects.toThrow('Client does not exist');
	});

	it('GET - should be returned a Client by id', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};
		const client = await clientController.create(clientDto).toPromise();

		const findClient = await clientController
			.findById(client._id)
			.toPromise();

		expect(client._id).toStrictEqual(findClient._id);
	});

	it('GET - shouldnd be returned a Client by id', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};
		await clientController.create(clientDto).toPromise();

		const newClientId = new Types.ObjectId();

		await expect(
			clientController.findById(newClientId._id.toString()).toPromise(),
		).rejects.toThrow('Client does not exist');
	});

	it('GET - should be return a Client array by query', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};
		const client = await clientController.create(clientDto).toPromise();

		const query: ClientQueryDto = {
			name: 'Matheus Henrique',
		};

		const emptyQuery: ClientQueryDto = {};

		const wrongValueQuery: ClientQueryDto = {
			name: 'Ana Carolina',
		};

		const findClientWithQuery = await clientController
			.findBy(query)
			.toPromise();

		const findClientWithEmptyQuery = await clientController
			.findBy(emptyQuery)
			.toPromise();

		const findClientWithWrongValueQuery = await clientController
			.findBy(wrongValueQuery)
			.toPromise();

		expect(findClientWithQuery.length > 0).toBe(true);
		expect(findClientWithEmptyQuery.length > 0).toBe(true);
		expect(findClientWithWrongValueQuery.length > 0).toBe(false);
		expect(findClientWithWrongValueQuery).toStrictEqual([]);
		expect(findClientWithQuery[0]._id).toStrictEqual(client._id);
	});

	it('REMOVE - should be removed a Client', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};
		const client = await clientController.create(clientDto).toPromise();

		await clientController.remove(client._id).toPromise();

		await expect(
			clientController.findById(client._id).toPromise(),
		).rejects.toThrow('Client does not exist');
	});

	it('REMOVE - shouldnd be removed a Client', async () => {
		const clientDto: ClientCreateDto = {
			name: 'Matheus Henrique',
			sex: Sex.masculine,
			age: 26,
			birthDate: '23/03/1995',
			city: cityMock._id,
		};
		await clientController.create(clientDto).toPromise();

		const newClientId = new Types.ObjectId();

		await expect(
			clientController.remove(newClientId._id.toString()).toPromise(),
		).rejects.toThrow('Client does not exist');
	});
});
