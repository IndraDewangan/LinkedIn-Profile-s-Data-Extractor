import express from "express";
import bodyParser from "body-parser";
import { Connection, table } from "./model/postgresSQL.js";
import cors from "cors";
import open from "open";

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


// app.post("/profiles", async(req,res)=>{
//     try {
//         const links = req.body.links;
//         const profiles = [];

//         // for (const link of links) {
//         //     // Process the profile link and extract data (e.g., using Puppeteer)
//         //     console.log(link);
//         //     // open(link);
//         // }

//         // Save profile data to the database
//         // await table.bulkCreate(profiles);

//         res.status(200).json({ message: 'Profile links processed and saved successfully' });
//     } catch (error) {
//         console.error('Error processing profile links:', error);
//         res.status(500).json({ error: 'Server Error' });
//     }
// });

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});