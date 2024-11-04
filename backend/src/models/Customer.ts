import { Model, DataTypes, Sequelize } from 'sequelize';

class Customer extends Model {
    public id!: number;
    public name!: string;
    public phoneNumber!: string;
    public email!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Customer;

export const initCustomer = (sequelize: Sequelize) => {
    Customer.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
    }, {
        sequelize,
        tableName: 'customers',
    });
};
