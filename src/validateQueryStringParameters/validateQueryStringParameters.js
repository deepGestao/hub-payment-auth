import Ajv from 'ajv';
import { schema } from './validateQueryStringParameters.schema';

const ajv = new Ajv();
const validate = ajv.compile(schema);

const parseContent = (content) => {
  if (content === 'null') {
    return {};
  }
  return JSON.parse(content);
};

const validateQueryStringParameters = (content) => {
  const contentParsed = parseContent(content);
  const result = validate(contentParsed);
  return {
    status: result ? 'valid' : 'invalid',
    ...contentParsed,
  };
};

export { validateQueryStringParameters };
