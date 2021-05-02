import {
	Controller,
	Body,
	Post,
	Put,
	Get,
	Delete,
	Param,
	Query,
	Logger,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

// SERVICES
import { ClientService } from './client.service';

// DTO's
import { ClientCreateDto } from './dtos/client-create.dto';
import { ClientUpdateDto } from './dtos/client-update.dto';
import { ClientQueryDto } from './dtos/client-query.dto';

// PIPES
import { MongoPipeTransform } from '../common/pipes/mongo-pipe-transform.pipe';

@ApiTags('Clientes')
@Controller('clients')
export class ClientController {
	private logger = new Logger(ClientController.name);

	constructor(private readonly clientService: ClientService) {}

	@Post()
	@ApiBody({ type: ClientCreateDto })
	@ApiOkResponse({ type: ClientCreateDto })
	@ApiOperation({
		description: 'Cria uma [Cliente] com o DTO recebido.',
	})
	public create(@Body() clientCreateDto: ClientCreateDto) {
		this.logger.log(`Create - payload: ${JSON.stringify(clientCreateDto)}`);

		return this.clientService.create(clientCreateDto).pipe(
			tap((data) =>
				this.logger.log(`Create Result: ${JSON.stringify(data)}`),
			),
			catchError((error) => {
				this.logger.error('Create error: ', error);
				return throwError(error);
			}),
		);
	}

	@Put(':id')
	@ApiBody({ type: ClientUpdateDto })
	@ApiOkResponse({ type: ClientCreateDto })
	@ApiParam({
		name: 'id',
		description: 'Passar o _id do cliente.',
	})
	@ApiOperation({
		description: 'Atualiza uma [Cliente] com o DTO recebido.',
	})
	public update(
		@Param('id') id: string,
		@Body() clientUpdateDto: ClientUpdateDto,
	) {
		this.logger.log(
			`Update - payload: ${JSON.stringify(id)} ${JSON.stringify(
				clientUpdateDto,
			)}`,
		);

		return this.clientService.update(id, clientUpdateDto).pipe(
			tap((data) =>
				this.logger.log(`Update Result: ${JSON.stringify(data)}`),
			),
			catchError((error) => {
				this.logger.error('Update error: ', error);
				return throwError(error);
			}),
		);
	}

	@Get()
	@ApiQuery({ type: ClientQueryDto })
	@ApiOkResponse({ type: [ClientCreateDto] })
	@ApiOperation({
		description: 'Busca um [Cliente] de acordo com a query enviada.',
	})
	public findBy(@Query(MongoPipeTransform) query: ClientQueryDto) {
		this.logger.log(`FindBy - payload: ${JSON.stringify(query)}`);

		return this.clientService.findBy(query).pipe(
			tap((data) =>
				this.logger.log(`FindBy Result: ${JSON.stringify(data)}`),
			),
			catchError((error) => {
				this.logger.error('FindBy error: ', error);
				return throwError(error);
			}),
		);
	}

	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'Passar o _id do cliente.',
	})
	@ApiOkResponse({ type: ClientCreateDto })
	@ApiOperation({
		description: 'Busca um [Cliente] de acordo com o _id enviado.',
	})
	public findById(@Param('id') id: string) {
		this.logger.log(`FindById - payload: ${JSON.stringify(id)}`);

		return this.clientService.findById(id).pipe(
			tap((data) =>
				this.logger.log(`FindById Result: ${JSON.stringify(data)}`),
			),
			catchError((error) => {
				this.logger.error('FindById error: ', error);
				return throwError(error);
			}),
		);
	}

	@Delete(':id')
	@ApiParam({
		name: 'id',
		description: 'Passar o _id do cliente.',
	})
	@ApiOkResponse({ type: ClientCreateDto })
	@ApiOperation({
		description: 'Remove um [Cliente] de acordo com o _id enviado.',
	})
	public remove(@Param('id') id: string) {
		this.logger.log(`Remove - payload: ${JSON.stringify(id)}`);

		return this.clientService.remove(id).pipe(
			tap((data) =>
				this.logger.log(
					`Remove Result - payload: ${JSON.stringify(data)}`,
				),
			),
			catchError((error) => {
				this.logger.error('FindById error: ', error);
				return throwError(error);
			}),
		);
	}
}
