import express from "express";
import cors from "cors";
console.log("works")

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("hello za warudo!");
});

//get test za studente
app.get("/studenti",(req,res)=>{
    let studenti = [
        {jmbag: 1, mail: "mail@mail.com", ime:"Ivan", prezime:"Ivica"},
        {jmbag: 2, mail: "snail@snail.com", ime:"Pero", prezime:"Perica"}
    ];
    res.status(200);
    res.send(studenti);
});

//post test za studente
app.post("/studenti",(req,res)=>{
    console.log("POdaci",req.body);
    res.status(201);
    res.send();
});

app.listen(port,()=>{
    console.log("listening on port ${port}")
});

