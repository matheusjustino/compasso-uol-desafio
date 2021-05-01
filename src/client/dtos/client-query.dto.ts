import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ClientQueryDto {
	@ApiProperty({
		required: false,
	})
	@IsString()
	@IsOptional()
	public name?: string;
}
