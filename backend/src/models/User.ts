import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default User;

export const initUser = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'agent',
        },
    }, {
        sequelize,
        tableName: 'users',
    });
};
