import { Injectable } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// SCHEMAS
import { CityDocument } from '../database/schemas/city.schema';

// REPOSITORIES
import { CityRepository } from '../database/repositories/city.repository';

// DTO's
import { CityDto } from './dto/city-create.dto';
import { CityQueryDto } from './dto/city-query.dto';

@Injectable()
export class CityService {
	constructor(private readonly cityRepository: CityRepository) {}

	public create(city: CityDto): Observable<CityDocument> {
		return from(this.cityRepository.cityModel.create(city)).pipe(
			map((city) => city),
			catchError((error) => throwError(error)),
		);
	}

	public findById(id: string): Observable<CityDocument> {
		return from(this.cityRepository.cityModel.findById(id)).pipe(
			map((city) => city),
			catchError((error) => throwError(error)),
		);
	}

	public findBy(query: CityQueryDto): Observable<CityDocument[]> {
		return from(this.cityRepository.cityModel.find({ ...query })).pipe(
			map((cities) => cities),
			catchError((error) => throwError(error)),
		);
	}
}
