import * as Joi from '@hapi/joi';

// Schema de validacion de config
export const configValidationSchema = Joi.object({
  EXPRESS_PORT: Joi.number().default(3056),
  APP_NAME: Joi.string().required(),
  NEST_ENV: Joi.string().required(),
  FASTIFY_PORT: Joi.number().default(3056),
  FASTIFY_FM_HTTP: Joi.string(),
  FASTIFY_FM_LOGGER: Joi.string()
});
