import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CityDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public state: string;
}
