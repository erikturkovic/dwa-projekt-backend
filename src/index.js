import dotenv from "dotenv"
dotenv.config();
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
    let cursor = await kolekcija.find({},{fields:{email: true }});
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

//post za detalje studenata
app.post("/detaljiStudenta",async(req,res)=>{
    let detaljiStudenta = req.body;

    let id;
    try{
        id = await auth.unesiPodatkeStudenta(detaljiStudenta);
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
    res.json(detaljiStudenta)
});

//post za detalje poslodavca
app.post("/detaljiPoslodavca",async(req,res)=>{
    let detaljiPoslodavca = req.body;

    let id;
    try{
        id = await auth.unesiPodatkePoslodavca(detaljiPoslodavca);
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
    res.json(detaljiPoslodavca)
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

app.get('/tajna',(req,res)=>{

    let ok = auth.verify(req,res);
    if(!ok){
        return;
    }

    res.json({message:"yo: "+ req.jwt.email})
})


app.listen(port, () => console.log(`Slušam na portu ${port}`));


