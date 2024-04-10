import { Sequelize } from "sequelize";
import { tableModel } from "./table.js";

let table=null;

export const Connection = async()=>{
    const sequelize = new Sequelize('extension', 'postgres', 'root', {
        host: 'localhost',
        dialect: 'postgres'
      });
      
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        table=tableModel(sequelize);
        await sequelize.sync();
        console.log('Table created successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

export {table};
