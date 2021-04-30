import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class City {
	@Prop({ required: true })
	public name: string;

	@Prop({ required: true })
	public state: string;
}

export type CityDocument = City & Document;
export const CitySchema = SchemaFactory.createForClass(City);
