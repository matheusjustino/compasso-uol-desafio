import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ClientQueryDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	public name?: string;
}
