const express = require("express");
const app = express();
const port = process.env.PORT | 3001;

app.set('trust proxy', true)//for accessing req.ip
app.use(express.static(__dirname + "/views"));
app.get('/user/get-ip', (req, res) => {
    const ipAdd = req.ip;
    console.log(req.ip);
    res.json({ ipAdd });
})
app.listen(port, () => {
    console.log(`Server Is Running At http://localhost:${port}`)
})