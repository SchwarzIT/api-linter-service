import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as compression from 'compression';
import validationPipe from './helpers/validation.pipe';
import configuration from './config/configuration';
import * as bodyParser from 'body-parser';
import { downloadRules } from './helpers/downloadRules';
import * as path from 'path';
import { migrateRules } from './helpers/migrateRules';

const isProduction = process.env.NODE_ENV === 'production';
const port = configuration().port;

async function bootstrap() {
  const rulesPath = path.join(process.cwd(), 'spectral-rules');

  try {
    await downloadRules(rulesPath);
    await migrateRules(rulesPath);
  } catch (error) {
    console.log(error);
  }

  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(validationPipe());
  app.use(compression());

  if (!isProduction) {
    const openApiServerNameProd = configuration().serverNames.prod;
    const openApiServerNameLocal = configuration().serverNames.local;
    const contactName = configuration().contactInformation.name;
    const contactLink = configuration().contactInformation.link;
    const contactEmail = configuration().contactInformation.email;
    const apiTag = configuration().api.tag;
    const apiDescription = configuration().api.description;
    const externalDocsName = configuration().docs.name;
    const externalDocsLink = configuration().docs.link;
    const apiVersion = configuration().api.version;
    const apiTitle = configuration().api.title;
    try {
      const customSwaggerOptions = {
        explorer: true,
      };
      const config = new DocumentBuilder()
        .setTitle(apiTitle)
        .setVersion(apiVersion)
        .addServer(openApiServerNameLocal)
        .addServer(openApiServerNameProd)
        .addBasicAuth()
        .setContact(contactName, contactLink, contactEmail)
        .addTag(apiTag)
        .setDescription(apiDescription)
        .setExternalDoc(externalDocsName, externalDocsLink)
        .build();
      const document = SwaggerModule.createDocument(app, config);
      fs.writeFileSync(
        './openapi/openapi.json',
        JSON.stringify(document, null, 4),
      );
      SwaggerModule.setup(
        '/api-linting/api/v1/swagger',
        app,
        document,
        customSwaggerOptions,
      );
    } catch (error) {
      console.log('Swagger Setup in dev mode failed.');
    }
  }
  await app.listen(port || 3000);
}
bootstrap();
