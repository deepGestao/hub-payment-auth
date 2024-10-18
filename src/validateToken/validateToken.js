import { validateMercadoPago } from './validateMercadoPago/validateMercadoPago';

const validateToken = (gateway, headers, params) => {
  if (gateway === 'mercadopago') {
    const result = validateMercadoPago(headers, params) ? 'Allow' : 'Deny';
    return result;
  }
  return 'Deny';
};

export { validateToken };
