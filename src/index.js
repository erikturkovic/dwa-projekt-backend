import express from "express";
console.log("works")

const app = express();
const port = 3000;
console.log("expres + ")
console.log("3000 + ")

app.get("/",(req,res)=>{
    res.send("hello za warudo!");
});

app.listen(port,()=>{
    console.log("listening on port ${port}")
});

