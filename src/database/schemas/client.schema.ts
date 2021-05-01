import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// SCHEMAS
import { City } from './city.schema';

// ENUM's
import { Sex } from '../../common/enums/sex.enum';

@Schema({ timestamps: true })
export class Client {
	@Prop({ required: true })
	public name: string;

	@Prop({ type: Sex, enum: [Sex.masculine, Sex.feminine], required: true })
	public sex: Sex;

	@Prop({ required: true })
	public age: number;

	@Prop({ required: true })
	public birthDate: string;

	@Prop({ type: Types.ObjectId, ref: City.name })
	public city: City;
}

export type ClientDocument = Client & Document;
export const ClientSchema = SchemaFactory.createForClass(Client);
