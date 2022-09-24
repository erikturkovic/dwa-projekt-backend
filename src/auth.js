import mongo from 'mongodb';
import connect from './db.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

(async()=>{
let db = await connect();
await db.collection("Korisnici").createIndex({email: 1}, {unique: true});
});

export default{

    async unesiPodatkeStudenta(detaljiStudenta){

        let db = await connect()
        let doc ={
            email: detaljiStudenta.email,
            vrsta: detaljiStudenta.vrsta,
            ime: detaljiStudenta.ime,
            prezime: detaljiStudenta.prezime,
            fakultet: detaljiStudenta.fakultet,
            jmbag: detaljiStudenta.jmbag,
            godina: detaljiStudenta.godina,
            kratkiOpis: detaljiStudenta.kratkiOpis,
        }
        let result =  await db.collection('detaljiStudenta').insertOne(doc);

    },

    async registerKorisnik(korisnikData){

        let db = await connect();

        let doc ={
            email: korisnikData.email,
            password: await bcrypt.hash(korisnikData.password,10),
            vrsta: korisnikData.vrsta,
        };
        try{
        
        let result =  await db.collection('Korisnici').insertOne(doc);
        if(result && result.insertedId){
            return result.insertedId;
        }

        } catch(e){
            if(e.name == 'MongoError' && e.code == 11000){
                throw new Error("Korisnik vec postoji");
            }
        }

    },
    async authenticateKorisnik(email, password){
        let db = await connect()
        let korisnikData = await db.collection("Korisnici").findOne({email: email})
        if(korisnikData && korisnikData.password && (await bcrypt.compare(password, korisnikData.password))){;
            
            delete korisnikData.password;
            let token = jwt.sign(korisnikData,process.env.JWT_SECRET,{
                algorithm:"HS512",
                expiresIn:"1week"
            });
            return{
                token,
                email: korisnikData.email,
                vrsta: korisnikData.vrsta
            }
        }
        else {
            throw new Error("cannont auth")
        }
    },
    verify(req,res){
        try{
        let authorization = req.headers.authorization.split(' ');
        let type = authorization[0];
        let token= authorization[1];
    
        if(type !== "Bearer"){
             res.status(401).send()
             return false;
        }
        else{
            req.jwt = jwt.verify(token,process.env.JWT_SECRET); 
            return true;           
        } 
    }catch(e){
        res.status(401).send();
        return false
    }   

    }
    }