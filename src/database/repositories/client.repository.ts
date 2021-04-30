import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Client, ClientDocument } from '../schemas/client.schema';

@Injectable()
export class ClientRepository {
	constructor(
		@InjectModel(Client.name)
		private readonly ClientRepository: Model<ClientDocument>,
	) {}

	public get clientRepository(): Model<ClientDocument> {
		return this.ClientRepository;
	}
}
