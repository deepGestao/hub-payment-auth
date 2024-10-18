import { generatePolicy } from './generatePolicy/generatePolicy';
import { validateQueryStringParameters } from './validateQueryStringParameters/validateQueryStringParameters';
import { validateToken } from './validateToken/validateToken';

const handler = async (event, context) => {
  console.log(event, context);
  const content = JSON.stringify(event.queryStringParameters);
  const validate = validateQueryStringParameters(content);
  if (validate.status === 'valid') {
    const action = validateToken(validate.gateway, event.headers, event.queryStringParameters);
    return generatePolicy('user', action, event.methodArn);
  }
  return generatePolicy('user', 'Deny', event.methodArn);
};

export { handler };
