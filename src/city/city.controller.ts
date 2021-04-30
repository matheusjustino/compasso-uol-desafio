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

// SERVICES
import { CityService } from './city.service';

// DTO's
import { CityDto } from './dto/city-create.dto';
import { CityQueryDto } from './dto/city-query.dto';

@Controller('cities')
export class CityController {
	private logger = new Logger(CityController.name);

	constructor(private readonly cityService: CityService) {}

	@Post()
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
