const express = require('express')
const validator = require('express-validator');
const app = express()
const bodyParser = require("body-parser") 
const helmet = require('helmet');
const routes = require('./routes/routes')
const cors = require('cors')


const port = 3000

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended:true
})); 

app.use(validator());
app.use(cors())

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


app.use("/api",routes)
