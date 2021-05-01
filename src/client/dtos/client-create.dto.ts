import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { Sex } from '../../common/enums/sex.enum';

export class ClientCreateDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	public name: string;

	@ApiProperty()
	@IsEnum(Sex, { message: `sex must be ${Sex.masculine} or ${Sex.feminine}` })
	@IsNotEmpty()
	public sex: Sex;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	public age: number;

	@ApiProperty()
	@IsString()
	public birthDate: string;

	@ApiProperty()
	@IsMongoId()
	@Type(() => Types.ObjectId)
	public city: Types.ObjectId;
}
