const validateMercadoPago = (headers, params) => {
  const xSignature = headers['x-signature'];
  const xRequestId = headers['x-request-id'];

  const dataID = params['data.id'];

  const parts = xSignature.split(',');
  let ts;
  let hash;

  parts.forEach((part) => {
    const [key, value] = part.split('=');
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === 'ts') {
        ts = trimmedValue;
      } else if (trimmedKey === 'v1') {
        hash = trimmedValue;
      }
    }
  });

  const hmac = crypto.createHmac('sha256', `${process.env.MERCADO_PAGO_SECRET}`);
  hmac.update(`id:${dataID};request-id:${xRequestId};ts:${ts};`);

  const sha = hmac.digest('hex');

  return (sha === hash);
};

export { validateMercadoPago };
