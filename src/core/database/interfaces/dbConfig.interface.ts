import { Dialect } from 'sequelize';

export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: Dialect;
  urlDatabase?: string;
}

export interface IDatabaseConfig {
  DEVELOPMENT: IDatabaseConfigAttributes;
}
