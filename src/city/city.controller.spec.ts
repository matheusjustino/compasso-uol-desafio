import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { Types, Error } from 'mongoose';

import { CityController } from './city.controller';

// MONGOOSE TEST
import {
	rootMongooseTestModule,
	closeInMongodConnection,
} from '../common/root-mongoose-test/root-mongoose-test.module';

// REPOSITORIES
import { CityRepository } from '../database/repositories/city.repository';

// MODELS PROVIDER
import { modelsProviderAsync } from '../database/models-provider';

// SERVICES
import { CityService } from './city.service';

// DTO's
import { CityCreateDto } from './dto/city-create.dto';
import { CityQueryDto } from './dto/city-query.dto';

describe('City Controller', () => {
	let cityController: CityController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeatureAsync(modelsProviderAsync),
			],
			controllers: [CityController],
			providers: [CityRepository, CityService],
		}).compile();

		cityController = module.get<CityController>(CityController);
	});

	afterAll(async () => {
		await closeInMongodConnection();
	});

	it('CREATE - should be created a City', async () => {
		const CityCreateDto: CityCreateDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const city = await cityController.create(CityCreateDto).toPromise();

		expect(city.name).toBe(CityCreateDto.name);
		expect(city.state).toBe(CityCreateDto.state);
	});

	it('CREATE - shouldnt be created a City', async () => {
		const CityCreateDto: CityCreateDto = {
			name: 'Campina Grande',
			state: null,
		};

		await expect(
			cityController.create(CityCreateDto).toPromise(),
		).rejects.toThrow(Error.ValidationError);
	});

	it('GET - should be returned a City by Id', async () => {
		const CityCreateDto: CityCreateDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const city = await cityController.create(CityCreateDto).toPromise();
		const findCity = await cityController.findById(city._id).toPromise();

		expect(findCity._id).toStrictEqual(city._id);
		expect(findCity.name).toBe(city.name);
		expect(findCity.state).toBe(city.state);
	});

	it('GET - shouldnt be returned a City by Id', async () => {
		const CityCreateDto: CityCreateDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const newCityId = new Types.ObjectId();

		await cityController.create(CityCreateDto).toPromise();

		await expect(
			cityController.findById(newCityId.toString()).toPromise(),
		).rejects.toThrow('City does not exist');
	});

	it('GET - should be returned a City array by query', async () => {
		const CityCreateDto: CityCreateDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const city = await cityController.create(CityCreateDto).toPromise();

		const emptyQuery: CityQueryDto = {};
		const queryWithFirstParameter: CityQueryDto = {
			name: 'Campina Grande',
		};
		const queryWithSecondParameter: CityQueryDto = {
			state: 'PB',
		};
		const queryWithAllParameters: CityQueryDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const cityWithEmptyQuery = await cityController
			.findBy(emptyQuery)
			.toPromise();
		const cityWithFirstParameter = await cityController
			.findBy(queryWithFirstParameter)
			.toPromise();
		const cityWithSecondParameter = await cityController
			.findBy(queryWithSecondParameter)
			.toPromise();
		const cityWithAllParameters = await cityController
			.findBy(queryWithAllParameters)
			.toPromise();

		expect(cityWithEmptyQuery.length > 0).toBe(true);
		expect(cityWithFirstParameter.length > 0).toBe(true);
		expect(cityWithSecondParameter.length > 0).toBe(true);
		expect(cityWithAllParameters.length > 0).toBe(true);
		expect(
			cityWithEmptyQuery.find((city) => city._id === city._id)._id,
		).toStrictEqual(city._id);
	});
});
