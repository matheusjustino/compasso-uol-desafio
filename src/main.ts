import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());
	app.useGlobalFilters(new HttpExceptionFilter());

	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('Compasso Uol Desafio')
		.setDescription(
			'API para criação e gerencimento de Cidades e Clientes.',
		)
		.setVersion('1.0')
		.addTag('CompassoUol')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(8080);
}
bootstrap();
