import { BadRequestException, Injectable } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// SCHEMAS
import { CityDocument } from '../database/schemas/city.schema';

// REPOSITORIES
import { CityRepository } from '../database/repositories/city.repository';

// DTO's
import { CityCreateDto } from './dto/city-create.dto';
import { CityQueryDto } from './dto/city-query.dto';

@Injectable()
export class CityService {
	constructor(private readonly cityRepository: CityRepository) {}

	public create(city: CityCreateDto): Observable<CityDocument> {
		return from(this.cityRepository.cityModel.create(city)).pipe(
			catchError((error) => throwError(error)),
		);
	}

	public findById(id: string): Observable<CityDocument> {
		return from(this.cityRepository.cityModel.findById(id)).pipe(
			map((city) => {
				if (!city) {
					throw new BadRequestException('City does not exist');
				}
				return city;
			}),
			catchError((error) => throwError(error)),
		);
	}

	public findBy(query: CityQueryDto): Observable<CityDocument[]> {
		return from(this.cityRepository.cityModel.find(query)).pipe(
			catchError((error) => throwError(error)),
		);
	}
}
