import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { City, CityDocument } from '../schemas/city.schema';

@Injectable()
export class CityRepository {
	constructor(
		@InjectModel(City.name) private readonly CityModel: Model<CityDocument>,
	) {}

	public get cityModel(): Model<CityDocument> {
		return this.CityModel;
	}
}
