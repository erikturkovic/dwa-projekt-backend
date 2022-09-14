import mongo from "mongodb";

let connection_string = 
"mongodb+srv://eturkovic:m7fLEyjZE6BvCVB9@cluster0.hsb02xo.mongodb.net/test";

let client = new mongo.MongoClient(connection_string,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = null;

function isConnected(){
    return !!client && !!client.topology && client.topology.isConnected
}

export default async () => {
    if(!db || !isConnected()){
        await client.connect();
        db = client.db("Baza");
        console.log("CONNECTED")
    }
    return db;
}

//client.connect((err)=>{
//    if(err){
//        console.error(err);
//        return;
//    }
//    console.log("Connected succesfully!")
//    client.close();
//})
//
//console.log("ok");