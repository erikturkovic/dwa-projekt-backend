import express from "express";
import cors from "cors";
console.log("works")

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//hellooo world
app.get("/",(req,res)=>{
    res.send("hello world!");
});

//get test za studente
app.get("/studenti",(req,res)=>{
    let studenti = [
        {jmbag: 1, mail: "mail@mail.com", ime:"Ivan", prezime:"Ivica"},
        {jmbag: 2, mail: "snail@snail.com", ime:"Pero", prezime:"Perica"},
        {jmbag: 3, mail: "lail@lail.com", ime:"Miro", prezime:"Miric"}
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

app.listen(port,()=>{
    console.log("listening on port ${port}")
});

