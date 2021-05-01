import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
import { CityDto } from './dto/city-create.dto';
import { CityQueryDto } from './dto/city-query.dto';

describe('City Service', () => {
	let cityService: CityService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeatureAsync(modelsProviderAsync),
			],
			providers: [CityRepository, CityService],
		}).compile();

		cityService = module.get<CityService>(CityService);
	});

	afterAll(async () => {
		await closeInMongodConnection();
	});

	it('CREATE - should be created a City', async () => {
		const cityDto: CityDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const city = await cityService.create(cityDto).toPromise();

		expect(city.name).toBe(cityDto.name);
		expect(city.state).toBe(cityDto.state);
	});

	it('CREATE - shouldnt be created a City', async () => {
		const cityDto: CityDto = {
			name: 'Campina Grande',
			state: null,
		};

		await expect(cityService.create(cityDto).toPromise()).rejects.toThrow(
			mongoose.Error.ValidationError,
		);
	});

	it('GET - should be returned a City by Id', async () => {
		const cityDto: CityDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const city = await cityService.create(cityDto).toPromise();
		const findCity = await cityService.findById(city._id).toPromise();

		expect(findCity._id).toStrictEqual(city._id);
		expect(findCity.name).toBe(city.name);
		expect(findCity.state).toBe(city.state);
	});

	it('GET - should be returned a City array by query', async () => {
		const cityDto: CityDto = {
			name: 'Campina Grande',
			state: 'PB',
		};

		const city = await cityService.create(cityDto).toPromise();

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

		const cityWithEmptyQuery = await cityService
			.findBy(emptyQuery)
			.toPromise();
		const cityWithFirstParameter = await cityService
			.findBy(queryWithFirstParameter)
			.toPromise();
		const cityWithSecondParameter = await cityService
			.findBy(queryWithSecondParameter)
			.toPromise();
		const cityWithAllParameters = await cityService
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
