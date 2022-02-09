import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as compression from 'compression';
import { MigrationHelper } from './helpers/migration.helper';
import validationPipe from './helpers/validation.pipe';
import configuration from './config/configuration';

const isProduction = process.env.NODE_ENV === 'production';
const openApiServerNameProd = configuration().serverNames.prod;
const openApiServerNameLocal = configuration().serverNames.local;
const port = configuration().port;
const contactName = configuration().contactInformation.name;
const contactLink = configuration().contactInformation.link;
const contactEmail = configuration().contactInformation.email;
const apiTag = configuration().api.tag;
const apiDescription = configuration().api.description;
const externalDocsName = configuration().docs.name;
const externalDocsLink = configuration().docs.link;
const apiVersion = configuration().api.version;
const apiTitle = configuration().api.title;
const migrationHelper = new MigrationHelper();

declare const module: {
  hot: { accept: () => void; dispose: (arg0: () => Promise<void>) => void };
};

async function bootstrap() {
  try {
    await migrationHelper.migrateSpectralFilesToJS(
      `${process.cwd()}/dist`,
      `${process.cwd()}/dist`,
    );
  } catch (error) {
    console.log(error);
  }
  if (!isProduction) {
    await migrationHelper.migrateSpectralFilesToJS(
      `${process.cwd()}/dist`,
      `${process.cwd()}/src`,
    );
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(validationPipe());
  app.use(compression());

  if (!isProduction) {
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

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
