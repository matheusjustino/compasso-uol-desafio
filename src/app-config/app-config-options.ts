import { join } from 'path';

const config = process.env.NODE_ENV ? 'production.env' : 'develop.env';

const configPath = join(process.cwd(), '/src/environments', config);

export const configOptions = {
	isGlobal: true,
	envFilePath: configPath,
};
