import {
	Controller,
	Body,
	Post,
	Put,
	Get,
	Delete,
	Param,
	Query,
	Res,
	Next,
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

// SERVICES
import { ClientService } from './client.service';

// DTO's
import { ClientCreateDto } from './dtos/client-create.dto';
import { ClientUpdateDto } from './dtos/client-update.dto';
import { ClientQueryDto } from './dtos/client-query.dto';

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
	public create(
		@Body() clientCreateDto: ClientCreateDto,
		@Res() res,
		@Next() next,
	) {
		this.logger.log(`Create - payload: ${JSON.stringify(clientCreateDto)}`);

		this.clientService.create(clientCreateDto).subscribe(
			(data) => {
				this.logger.log(`Create Result: ${JSON.stringify(data)}`);
				return res.json(data);
			},
			(error) => {
				this.logger.error('create error: ', error);
				res.status(500);
				next(new Error(error));
			},
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
		@Res() res,
		@Next() next,
	) {
		this.logger.log(
			`Update - payload: ${JSON.stringify(id)} ${JSON.stringify(
				clientUpdateDto,
			)}`,
		);

		this.clientService.update(id, clientUpdateDto).subscribe(
			(data) => {
				this.logger.log(`Update Result: ${JSON.stringify(data)}`);
				return res.json(data);
			},
			(error) => {
				this.logger.error('Update error: ', error);
				res.status(500);
				next(new Error(error));
			},
		);
	}

	@Get()
	@ApiQuery({ type: ClientQueryDto })
	@ApiOkResponse({ type: [ClientCreateDto] })
	@ApiOperation({
		description: 'Busca um [Cliente] de acordo com a query enviada.',
	})
	public findBy(@Query() query: ClientQueryDto, @Res() res, @Next() next) {
		this.logger.log(`FindBy - payload: ${JSON.stringify(ClientQueryDto)}`);

		this.clientService.findBy(query).subscribe(
			(data) => {
				this.logger.log(`FindBy Result: ${JSON.stringify(data)}`);
				return res.json(data);
			},
			(error) => {
				this.logger.error('FindBy error: ', error);
				res.status(500);
				next(new Error(error));
			},
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
	public findById(@Param('id') id: string, @Res() res, @Next() next) {
		this.logger.log(`FindById - payload: ${JSON.stringify(id)}`);

		this.clientService.findById(id).subscribe(
			(data) => {
				this.logger.log(`FindById Result: ${JSON.stringify(data)}`);
				return res.json(data);
			},
			(error) => {
				this.logger.error('FindById error: ', error);
				res.status(500);
				next(new Error(error));
			},
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
	public remove(@Param('id') id: string, @Res() res, @Next() next) {
		this.logger.log(`Remove - payload: ${JSON.stringify(id)}`);

		this.clientService.remove(id).subscribe(
			(data) => {
				this.logger.log(
					`Remove Result - payload: ${JSON.stringify(id)}`,
				);
				return res.json(data);
			},
			(error) => {
				this.logger.log(
					`Remove error - payload: ${JSON.stringify(id)}`,
				);
				res.status(500);
				next(new Error(error));
			},
		);
	}
}
