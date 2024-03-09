import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

interface SetupSwaggerOptions {
  app: INestApplication;
  docsRoute: string;
  port: number;
  yamlPath: string;
}

const parseOpenApiYaml = async (
  path: string,
): Promise<OpenAPIObject | null> => {
  try {
    const content = await readFile(resolve(path), {
      encoding: 'utf8',
    });

    const document = parse(content) as OpenAPIObject;

    return document;
  } catch {
    return null;
  }
};

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
