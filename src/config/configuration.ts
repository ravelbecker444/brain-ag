import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5433,
  username: process.env.DB_USERNAME || 'nestjs',
  password: process.env.DB_PASSWORD || 'nestjs123',
  database: process.env.DB_NAME || 'nestjs_db',
}));
