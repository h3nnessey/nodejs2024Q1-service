import { OpenAPIObject } from '@nestjs/swagger';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { stringify } from 'yaml';

export const writeOpenApiYaml = async (
  path: string,
  openApiObject: OpenAPIObject,
) => {
  try {
    const dest = resolve(path);

    await writeFile(dest, stringify(openApiObject));
  } catch {
    console.log('Failed to write yaml file');
  }
};
