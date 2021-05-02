import {
	Controller,
	Body,
	Post,
	Get,
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
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// SERVICES
import { CityService } from './city.service';

// DTO's
import { CityDto } from './dto/city-create.dto';
import { CityQueryDto } from './dto/city-query.dto';

// PIPES
import { MongoPipeTransform } from '../common/pipes/mongo-pipe-transform.pipe';

@ApiTags('Cidades')
@Controller('cities')
export class CityController {
	private logger = new Logger(CityController.name);

	constructor(private readonly cityService: CityService) {}

	@Post()
	@ApiBody({ type: CityDto })
	@ApiOkResponse({ type: CityDto })
	@ApiOperation({
		description: 'Cria uma [Cidade] com o DTO recebido.',
	})
	public create(@Body() cityDto: CityDto) {
		this.logger.log(`Create - payload: ${JSON.stringify(cityDto)}`);

		return this.cityService.create(cityDto).pipe(
			tap((data) => {
				this.logger.log(`Create Result: ${JSON.stringify(data)}`);
			}),
			catchError((error) => {
				this.logger.error('Create error: ', error);
				return throwError(error);
			}),
		);
	}

	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'Passar o _id da cidade.',
	})
	@ApiOkResponse({ type: CityDto })
	@ApiOperation({
		description: 'Busca uma [Cidade] de acordo com o _id enviado.',
	})
	public findById(@Param('id') id: string) {
		this.logger.log(`FindById - payload: ${JSON.stringify(id)}`);

		return this.cityService.findById(id).pipe(
			tap((data) =>
				this.logger.log(`FindById Result: ${JSON.stringify(data)}`),
			),
			catchError((error) => {
				this.logger.error('FindById error: ', error);
				return throwError(error);
			}),
		);
	}

	@Get()
	@ApiQuery({ type: CityDto })
	@ApiOkResponse({ type: [CityDto] })
	@ApiOperation({
		description: 'Busca uma [Cidade] de acordo com a query enviada.',
	})
	public findBy(@Query(MongoPipeTransform) query: CityQueryDto) {
		this.logger.log(`FindBy - payload: ${JSON.stringify(query)}`);

		return this.cityService.findBy(query).pipe(
			tap((data) =>
				this.logger.log(`FindBy Result: ${JSON.stringify(data)}`),
			),
			catchError((error) => {
				this.logger.error('FindBy error: ', error);
				return throwError(error);
			}),
		);
	}
}
