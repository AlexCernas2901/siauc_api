process.loadEnvFile('./src/envs/.env.db')
process.loadEnvFile('./src/envs/.env.app')

export const appConfig = {
  port: process.env.PORT
}

export const dbConfig = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME
}
