const baseConfig = {
  app_name: process.env.APP_NAME || 'tp-final-uca',
  express_port: parseInt(process.env.EXPRESS_PORT) || 8080,
  fastify_port: parseInt(process.env.FASTIFY_PORT) || 8080,
  env: process.env.NODE_ENV || 'local',
  app_version: process.env.npm_package_version,
  msyqlConnection: {}
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
