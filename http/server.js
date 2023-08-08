const express = require('express')
const app = express()


const port = 9696

app.use(express.urlencoded({ extended: true }));

app.get("/sensor", (req, res) => {
  let temp = Math.floor(Math.random() * 40);
  let humidity = Math.floor(Math.random()*100);
  console.log("GET Request was sent");
  res.send("Temperature is " + temp + "C degrees, humidity is " + humidity + "%");
});



app.post('/sensor', (req, res) => {
  console.log("POST Request was sent");
  console.log(req.body);
 res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
