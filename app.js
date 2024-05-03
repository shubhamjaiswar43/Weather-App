const express = require("express");
const app = express();
const port = process.env.PORT | 3001;

app.use(express.static(__dirname + "/views"));
app.get('/get-ip', (req, res) => {
    const ipAdd = req.ip || req.connection.remoteAddress;
    console.log(req.ip);
    console.log(req.connection.remoteAddress);
    res.json({ ipAdd });
})
app.listen(port, () => {
    console.log(`Server Is Running At http://localhost:${port}`)
})