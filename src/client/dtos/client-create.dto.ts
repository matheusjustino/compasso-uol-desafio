import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
	@IsString()
	public city: string;
}
