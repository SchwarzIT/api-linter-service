import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as compression from 'compression';
import { MigrationHelper } from './helpers/migration.helper';
import useBasicAuth from './helpers/basicAuth.plugin';
import validationPipe from './helpers/validation.pipe';

const isProduction = process.env.NODE_ENV === 'production';
const openApiServerNameProd = process.env.SERVER_NAME_PROD;
const openApiServerNameLocal = process.env.SERVER_NAME_LOCAL;
const port = +process.env.PORT;
const basicAuthUserName = process.env.BASIC_AUTH_USER;
const basicAuthHash = process.env.BASIC_AUTH_HASH;
const contactName = process.env.CONTACT_NAME;
const contactLink = process.env.CONTACT_LINK;
const contactEmail = process.env.CONTACT_EMAIL;
const apiTag = process.env.API_TAG;
const apiDescription = process.env.API_DESCRIPTION;
const externalDocsName = process.env.EXTERNAL_DOCS_NAME;
const externalDocsLink = process.env.EXTERNAL_DOCS_LINK;
const apiVersion = process.env.API_VERSION;
const apiTitle = process.env.API_TITLE;
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
  if (isProduction) {
    app.use(
      ['/api-linting/api/v1/lintings', '/api-linting/api/v1/rules'],
      useBasicAuth(basicAuthUserName, basicAuthHash),
    );
  }
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
