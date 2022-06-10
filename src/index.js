import express from "express";
import cors from "cors";

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

//get test za poslodavce
app.get("/poslodavci",(req,res)=>{
    let poslodavci = [
        {id_poslodavca: 1, mail: "lol@lol.com", ime:"Roko", prezime:"Rokic"},
        {id_poslodavca: 2, mail: "lmao@lmao.com", ime:"Marko", prezime:"Markic"},
        {id_poslodavca: 3, mail: "rofl@rofl.com", ime:"Filip", prezime:"Fico"}
    ];
    res.status(200);
    res.send(poslodavci);
});

//post test za poslodavce
app.post("/poslodavci",(req,res)=>{
    console.log("Podaci",req.body);
    res.status(201);
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
    let ponude = [
        {id_ponude: 1, id_poslodavca:1, posao:"intern" , prijavljeni:[{jmbag:1},{jmbag:2}]},
        {id_ponude: 2, id_poslodavca:2, posao:"konobar", prijavljeni:[{jmbag:2},{jmbag:3}]},
        {id_ponude: 3, id_poslodavca:3, posao:"dostavljač" , prijavljeni:[{jmbag:3},{jmbag:1}]}
    ];
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
    let detalji_studenta = [
    {jmbag:1, fakultet: "a bo", godina:"3",studij:"rač"},
    {jmbag:2, fakultet: "a bo", godina:"1",studij:"stro"},
    {jmbag:3, fakultet: "a bo", godina:"2",studij:"inf"}
    ];
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
    let biznis = [
    {id_biznisa:1, id_poslodavca: 1 , ime_biznisa:"wow.d.o.o.", mjesto_hq:"Pula"},
    {id_biznisa:2, id_poslodavca: 2 , ime_biznisa:"hmm.d.o.o.", mjesto_hq:"Pula"},
    {id_biznisa:3, id_poslodavca: 3, ime_biznisa:"hah.d.o.o.", mjesto_hq:"Pula"}
    ];
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


