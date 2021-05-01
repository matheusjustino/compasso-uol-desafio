import { BadRequestException, Injectable } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

// SERVICES
import { CityService } from '../city/city.service';

// SCHEMAS
import { ClientDocument } from '../database/schemas/client.schema';

// REPOSITORIES
import { ClientRepository } from '../database/repositories/client.repository';

// DTO's
import { ClientCreateDto } from './dtos/client-create.dto';
import { ClientUpdateDto } from './dtos/client-update.dto';
import { ClientQueryDto } from './dtos/client-query.dto';

@Injectable()
export class ClientService {
	constructor(
		private readonly clientRepository: ClientRepository,
		private readonly cityService: CityService,
	) {}

	public create(client: ClientCreateDto) {
		return from(this.cityService.findById(client.city)).pipe(
			map((result) => {
				if (!result) {
					throw new BadRequestException('City does not exist');
				}

				return from(this.clientRepository.clientModel.create(client));
			}),
			mergeMap((data) => data),
			catchError((error) => throwError(error)),
		);
	}

	public update(
		id: string,
		client: ClientUpdateDto,
	): Observable<ClientDocument> {
		return from(
			this.clientRepository.clientModel.findByIdAndUpdate(
				id,
				{
					$set: client,
				},
				{
					new: true,
				},
			),
		).pipe(catchError((error) => throwError(error)));
	}

	public findById(id: string): Observable<ClientDocument> {
		return from(
			this.clientRepository.clientModel.findById(id).populate('city'),
		).pipe(
			map((result) => {
				if (!result) {
					throw new BadRequestException('Client does not exist');
				}

				return result;
			}),
			catchError((error) => throwError(error)),
		);
	}

	public findBy(query: ClientQueryDto): Observable<ClientDocument[]> {
		return from(
			this.clientRepository.clientModel.find(query).populate('city'),
		).pipe(catchError((error) => throwError(error)));
	}

	public remove(id: string) {
		return from(
			this.clientRepository.clientModel.findByIdAndDelete(id),
		).pipe(
			map((result) => {
				if (!result) {
					throw new BadRequestException('Client does not exist');
				}

				return result;
			}),
			catchError((error) => throwError(error)),
		);
	}
}
