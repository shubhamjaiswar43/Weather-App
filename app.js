const express = require("express");
const app = express();
const port = process.env.PORT | 3001;

app.use(express.static(__dirname+"/views"));

app.listen(port,()=>{
    console.log(`Server Is Running At http://localhost:${port}`)
})