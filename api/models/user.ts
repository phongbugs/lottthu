import { Table, Column, Model, DataType } from "sequelize-typescript";

import { Optional } from "sequelize";

// Define the attributes for the User model
interface UserAttributes {
  id?: number; // Assuming you have an auto-incrementing ID
  username: string;
  email: string;
  passwordHash: string;
}

// Optional attributes for the User model
type UserCreationAttributes = Optional<UserAttributes, "id">;

@Table({ tableName: "Users", timestamps: true })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash!: string;
}
