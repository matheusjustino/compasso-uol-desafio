import {
	Controller,
	Body,
	Post,
	Get,
	Param,
	Query,
	Res,
	Logger,
	Next,
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
import { CityService } from './city.service';

// DTO's
import { CityDto } from './dto/city-create.dto';
import { CityQueryDto } from './dto/city-query.dto';

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
	public create(@Body() cityDto: CityDto, @Res() res, @Next() next) {
		this.logger.log(`Create - payload: ${JSON.stringify(cityDto)}`);

		this.cityService.create(cityDto).subscribe(
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

	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'Passar o _id da cidade.',
	})
	@ApiOkResponse({ type: CityDto })
	@ApiOperation({
		description: 'Busca uma [Cidade] de acordo com o _id enviado.',
	})
	public findById(@Param('id') id: string, @Res() res, @Next() next) {
		this.logger.log(`FindById - payload: ${JSON.stringify(id)}`);

		this.cityService.findById(id).subscribe(
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

	@Get()
	@ApiQuery({ type: CityDto })
	@ApiOkResponse({ type: [CityDto] })
	@ApiOperation({
		description: 'Busca uma [Cidade] de acordo com a query enviada.',
	})
	public findBy(
		@Query() cityQueryDto: CityQueryDto,
		@Res() res,
		@Next() next,
	) {
		this.logger.log(`FindBy - payload: ${JSON.stringify(cityQueryDto)}`);

		this.cityService.findBy(cityQueryDto).subscribe(
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
}
