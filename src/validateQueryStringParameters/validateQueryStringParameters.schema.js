const schema = {
  type: 'object',
  additionalProperties: true,
  required: ['gateway'],
  properties: {
    gateway: { type: 'string', enum: ['mercadopago'] },
  },
};

export { schema };
