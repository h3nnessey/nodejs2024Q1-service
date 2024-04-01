import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { parseOpenApiYaml } from './parse-yaml';

interface SetupSwaggerOptions {
  app: INestApplication;
  docsRoute: string;
  port: number;
  yamlPath: string;
}

export const setupSwaggerFromYaml = async ({
  app,
  yamlPath,
  docsRoute,
  port,
}: SetupSwaggerOptions) => {
  const document = await parseOpenApiYaml(yamlPath);

  if (document) {
    SwaggerModule.setup(docsRoute, app, document);

    return `Open API docs available on: { PORT: ${port}, route: /${docsRoute} }`;
  }
};
