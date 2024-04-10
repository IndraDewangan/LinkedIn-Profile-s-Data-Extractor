import express from "express";
import bodyParser from "body-parser";
import { Connection, table } from "./model/postgresSQL.js";
import cors from "cors";

const port =3000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

Connection();

app.post("/datas", async(req,res)=>{
    var datas = req.body.datas;
    for (const data of datas) {
        console.log(data);
    }
    var profiles={
        name : datas[0],
        url : datas[1],
        about : datas[2],
        bio : datas[3],
        location : datas[4],
        follower_count : datas[5],
        connection_count : datas[6],
    }
    var profilesData=[profiles];
    console.log(profilesData)
    await table.bulkCreate(profilesData);
});

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});