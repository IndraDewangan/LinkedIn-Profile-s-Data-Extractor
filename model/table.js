import { Sequelize } from "sequelize";
export const  tableModel = (seq)=>{
    const {DataTypes} = Sequelize;
    return seq.define("user",{
        name : {
            type : DataTypes.TEXT,
        },
        url : {
            type : DataTypes.TEXT,
        },
        about : {
            type : DataTypes.TEXT,
        },
        bio : {
            type : DataTypes.TEXT,
        },
        location : {
            type : DataTypes.TEXT,
        },
        follower_count : {
            type : DataTypes.INTEGER,
        },
        connection_count : {
            type : DataTypes.INTEGER, 
        }      
    });
}