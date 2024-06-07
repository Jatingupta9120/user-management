import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: UUIDV4,
  })
  id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email format.',
      },
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_no: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.ENUM,
    values: ['admin', 'user'],
    allowNull: false,
  })
  role: string;
  @Column({
    type: DataType.ENUM,
    values: ['Male', 'Female'],
    allowNull: false,
  })
  gender: string;
}
