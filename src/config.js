// TODO: tao file .env bo vao gitignore de luu bien ko public
export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = '123',
  DB_HOST = 'localhost'

} = process.env

export const IN_PROD = NODE_ENV === 'production'
