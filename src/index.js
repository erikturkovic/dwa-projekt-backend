import express from "express";
import cors from "cors";
import mongo from 'mongodb';

import auth from './auth.js'
import connect from "./db.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//get za korisnike
app.get("/korisnici",async(req,res)=>{
    let db = await connect();
    let kolekcija = db.collection("Korisnici");
    let cursor = await kolekcija.find();
    let korisnikData = await cursor.toArray();
    res.status(200);
    res.json(korisnikData);
});

//post za korisnike
app.post("/korisnici",async(req,res)=>{
    let korisnikData = req.body;

    let id;
    try{
        id = await auth.registerKorisnik(korisnikData);
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
    res.json(korisnikData)
});
//auth za korisnike
app.post("/auth",async(req,res)=>{

    let korisnikData = req.body;
    try{
        let result = await auth.authenticateKorisnik(korisnikData.email, korisnikData.password);
        res.json(result);
    }catch(e){
        res.status(403).json({error: e.message});
    }

});

app.get('/tajna')


app.listen(port, () => console.log(`Slušam na portu ${port}`));


