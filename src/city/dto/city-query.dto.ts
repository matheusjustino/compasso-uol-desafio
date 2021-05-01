import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CityQueryDto {
	@ApiProperty({
		required: false,
	})
	@IsString()
	@IsOptional()
	public name?: string;

	@ApiProperty({
		required: false,
	})
	@IsString()
	@IsOptional()
	public state?: string;
}
