const baseConfig = {
  app_name: process.env.APP_NAME || 'tp-final-uca',
  express_port: parseInt(process.env.EXPRESS_PORT) || 8080,
  fastify_port: parseInt(process.env.FASTIFY_PORT) || 8080,
  env: process.env.NODE_ENV || 'local',
  app_version: process.env.npm_package_version,
  app_prefix: process.env.API_PREFIX || 'v1/transport/',
  msyqlConnection: {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_HOST || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_SCHEMA || 'transport',
    synchronize: !!process.env.DB_SYNCHRONIZE
  },
  token: {
    secret: process.env.TOKEN_SECRET || 'thisIsAkeyforUcaFinalTp$',
    expiration: process.env.TOKEN_EXPIRATION || '600s'
  },
  salt: parseInt(process.env.ENCRIPTATION_SALT || '10', 10)
};

const setVarsEnv = (aditionalEnvConfig = {}) => {
  return { ...baseConfig, aditionalEnvConfig };
};

export const environmentConfig = {
  local: setVarsEnv(),
  test: setVarsEnv(),
  int: setVarsEnv(),
  qa: setVarsEnv(),
  prod: setVarsEnv()
};
