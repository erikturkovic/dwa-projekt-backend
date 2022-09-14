import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";


import connect from "./db.js"

const app = express();
const port = 3000;

app.use(bodyParser)
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


//hellooo world
app.get("/",(req,res)=>{
    res.send("hello world!");
});

//get za studente
app.get("/studenti",async(req,res)=>{
    let db = await connect();
    let kolekcija = db.collection("Studenti");
    let cursor = await kolekcija.find();
    let data = await cursor.toArray();
    res.status(200);
    res.json(data);
});

//post za studente
app.post("/studenti",async(req,res)=>{

    let doc = req.body;
    console.log(doc);

    let db = await connect();
    let kolekcija = db.collection("Studenti");

    
    let rezultat = await kolekcija.insertOne(doc)

    res.send();
});

//patch test za studente
app.patch("/studenti/:jmbag",(req, res)=>{
    console.log("Podaci", req.params.jmbag, req.body);
    res.status(200);
    res.send();
});

//delete test za studente
app.delete("/studenti/:jmbag",(req, res)=>{
    console.log("Podaci", req.params.jmbag);
    res.status(200);
    res.send();
})

//get test za poslodavce
app.get("/poslodavci",async(req,res)=>{

    let db = await connect();
    let kolekcija = db.collection("Poslodavci");
    let cursor = await kolekcija.find();
    let data = await cursor.toArray();
    res.status(200);
    res.json(data);


    res.status(200);
    res.send();
});

//post test za poslodavce
app.post("/poslodavci",async(req,res)=>{
    let doc = req.body;
    console.log(doc);

    let db = await connect();
    let kolekcija = db.collection("Poslodavci");

    
    let rezultat = await kolekcija.insertOne(doc)
    res.send();
});

//patch test za poslodavce
app.patch("/poslodavci/:id_poslodavca",(req, res)=>{
    console.log("Podaci", req.params.id_poslodavca, req.body);
    res.status(200);
    res.send();
});

//delete test za poslodavce
app.delete("/poslodavci/:id_poslodavca",(req, res)=>{
    console.log("Podaci", req.params.id_poslodavca);
    res.status(200);
    res.send();
})

//get test za ponude
app.get("/ponude",(req,res)=>{

    res.status(200);
    res.send(ponude);
});

//post test za ponude
app.post("/ponude",(req,res)=>{
    console.log("Podaci",req.body);
    res.status(201);
    res.send();
});

//patch test za ponude
app.patch("/ponude/:id_ponude",(req, res)=>{
    console.log("Podaci", req.params.id_ponude, req.body);
    res.status(200);
    res.send();
});

//delete test za ponude
app.delete("/ponude/:id_ponude",(req, res)=>{
    console.log("Podaci", req.params.id_ponude);
    res.status(200);
    res.send();
})

//get test za detalje studenta
app.get("/studenti/detalji",(req,res)=>{

    res.status(200);
    res.send(detalji_studenta);
});

//post test za detalje studenta
app.post("/studenti/detalji",(req,res)=>{
    console.log("Podaci",req.body);
    res.status(201);
    res.send();
});

//patch test za detalje studenta
app.patch("/studenti/detalji/:jmbag",(req, res)=>{
    console.log("Podaci", req.params.jmbag, req.body);
    res.status(200);
    res.send();
});

//delete test za ponude
app.delete("/studenti/detalji/:jmbag",(req, res)=>{
    console.log("Podaci", req.params.jmbag);
    res.status(200);
    res.send();
})

//get test za detalje biznisa
app.get("/biznis",(req,res)=>{
    res.status(200);
    res.send(biznis);
});

//post test za detalje biznisa
app.post("/biznis",(req,res)=>{
    console.log("Podaci",req.body);
    res.status(201);
    res.send();
});

//patch test za detalje biznisa
app.patch("/biznis/:id_biznisa",(req, res)=>{
    console.log("Podaci", req.params.id_biznisa, req.body);
    res.status(200);
    res.send();
});

//delete test za ponude
app.delete("/biznis/:id_biznisa",(req, res)=>{
    console.log("Podaci", req.params.id_biznisa);
    res.status(200);
    res.send();
})

app.listen(port, () => console.log(`Slušam na portu ${port}`));


