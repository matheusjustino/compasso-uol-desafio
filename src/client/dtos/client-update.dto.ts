import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class ClientUpdateDto {
	// @IsMongoId()
	// @Type(() => Types.ObjectId)
	// public id: Types.ObjectId;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public name: string;
}
