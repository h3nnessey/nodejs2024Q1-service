import { OpenAPIObject } from '@nestjs/swagger';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

export const parseOpenApiYaml = async (
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
