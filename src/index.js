import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongo from "mongodb";
import auth from "./auth.js";
import connect from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//get za korisnike
app.get("/korisnici", async (req, res) => {
  let db = await connect();
  let query = req.query;
  let kolekcija = db.collection("Korisnici");

  let selekcija = {};
  if (query.email) {
    selekcija.email = query.email;
  }

  let cursor = await kolekcija.find(selekcija);
  let korisnikData = await cursor.toArray();
  res.status(200);
  res.json(korisnikData);
});

//post za korisnike
app.post("/korisnici", async (req, res) => {
  let korisnikData = req.body;

  let id;
  try {
    id = await auth.registerKorisnik(korisnikData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.json(korisnikData);
});

//post za detalje studenata
app.post("/detaljiStudenta", async (req, res) => {
  let detaljiStudenta = req.body;

  let id;
  try {
    id = await auth.unesiPodatkeStudenta(detaljiStudenta);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.json(detaljiStudenta);
});

//get za detalje student
app.get("/detaljiStudenta", async (req, res) => {
  let db = await connect();
  let query = req.query;
  let kolekcija = db.collection("detaljiStudenta");

  let selekcija = {};
  if (query.email) {
    selekcija.email = query.email;
  }

  let cursor = await kolekcija.find(selekcija);
  let korisnikData = await cursor.toArray();
  res.status(200);
  res.json(korisnikData);
});

//Patch za studente
app.patch("/detaljiStudenta/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  delete data._id;

  let db = await connect();

  let result = await db.collection("detaljiStudenta").updateOne(
    { _id: mongo.ObjectId(id) },
    {
      $set: data,
    }
  );

  if (result && result.modifiedCount == 1) {
    res.json({ status: "success" });
  } else {
    res.json({
      status: "fail",
    });
  }
});

//post za detalje poslodavca
app.post("/detaljiPoslodavca", async (req, res) => {
  let detaljiPoslodavca = req.body;

  let id;
  try {
    id = await auth.unesiPodatkePoslodavca(detaljiPoslodavca);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.json(detaljiPoslodavca);
});

//get za detalje poslodavca
app.get("/detaljiPoslodavca", async (req, res) => {
  let db = await connect();
  let query = req.query;
  let kolekcija = db.collection("detaljiPoslodavca");

  let selekcija = {};
  if (query.email) {
    selekcija.email = query.email;
  }

  let cursor = await kolekcija.find(selekcija);
  let korisnikData = await cursor.toArray();
  res.status(200);
  res.json(korisnikData);
});

//patch za detalje poslodavca
app.patch("/detaljiPoslodavca/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  delete data._id;

  let db = await connect();

  let result = await db.collection("detaljiPoslodavca").updateOne(
    { _id: mongo.ObjectId(id) },
    {
      $set: data,
    }
  );

  if (result && result.modifiedCount == 1) {
    res.json({ status: "success" });
  } else {
    res.json({
      status: "fail",
    });
  }
});

//post objave ponuda
app.post("/detaljiPonuda", async (req, res) => {
  let detaljiPonuda = req.body;

  let id;
  try {
    id = await auth.objaviPonudu(detaljiPonuda);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.json(detaljiPonuda);
});

//Get za objave ponuda
app.get("/detaljiPonuda", async (req, res) => {
  let db = await connect();
  let query = req.query;
  let kolekcija = db.collection("detaljiPonuda");

  let selekcija = {};
  if (query.objavio) {
    selekcija.objavio = query.objavio;
  }else if(query.imePrakse){
    selekcija.imePrakse=query.imePrakse
  }else if(query.objavio){
    selekcija.objavio=query.objavio
  }


  let cursor = await kolekcija.find(selekcija);
  let detaljiPonuda = await cursor.toArray();
  res.status(200);
  res.json(detaljiPonuda);
});
//get prijava ponuda
app.get("/prijavljenePonude", async (req, res) => {
  let db = await connect();
  let query = req.query;
  let kolekcija = db.collection("prijavljenePonude");

  let selekcija = {};
  if (query.idPonude) {
    selekcija.idPonude = query.idPonude;
  } else {
    selekcija.prijavio = query.prijavio;
  }
  let cursor = await kolekcija.find(selekcija);
  let detaljiPonude = await cursor.toArray();
  res.status(200);
  res.json(detaljiPonude);
});

//Delete za objavljene ponude
app.delete("/detaljiPonuda/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let db = await connect();
  let query = req.query;
  let kolekcija = db.collection("detaljiPonuda");

  let selekcija = {};
  if (query._id) {
    selekcija._id = query._id;
  }

  const result = await kolekcija.deleteOne(selekcija);
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
});

//post prijave ponuda
app.post("/prijavljenePonude", async (req, res) => {
  let prijavljenePonude = req.body;

  let id;
  try {
    id = await auth.prijaviPonudu(prijavljenePonude);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.json(prijavljenePonude);
});

//delete za prijavljene ponude
app.delete("/prijavljenePonude/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let db = await connect();
  let query = req.query;
  let kolekcija = db.collection("prijavljenePonude");

  let selekcija = {};
  if (query._id) {
    selekcija._id = query._id;
  }

  const result = await kolekcija.deleteOne(selekcija);
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
});

//auth za korisnike
app.post("/auth", async (req, res) => {
  let korisnikData = req.body;
  try {
    let result = await auth.authenticateKorisnik(
      korisnikData.email,
      korisnikData.password
    );
    res.json(result);
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
});

app.get("/tajna", (req, res) => {
  let ok = auth.verify(req, res);
  if (!ok) {
    return;
  }

  res.json({ message: "yo: " + req.jwt.email });
});

app.listen(port, () => console.log(`Slušam na portu ${port}`));
