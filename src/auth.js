import mongo from 'mongodb';
import connect from './db.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

(async()=>{
let db = await connect();
await db.collection("Korisnici").createIndex({email: 1}, {unique: true});
});

export default{
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
            let token = jwt.sign(korisnikData,"shhh",{
                algorithm:"HS512",
                expiresIn:"1week"
            });
            return{
                token,
                email: korisnikData.email
            }
        }
        else {
            throw new Error("cannont auth")
        }
    }
    }