const express = require("express");
const morgan = require("morgan")
const helmet = require("helmet");
const cors = require("cors");
let path = require('path')

// Port
const port = 3000;

//Express Rate Limit es un middleware básico de limitación de velocidad para Express.js que, 
//limita las solicitudes API repetidas desde la misma dirección IP.
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2 // limit each IP to 100 requests per windowMs
});

//serve-favicon es un middleware de servicio de favicon. 
//Puede recordar la solicitud fallida de favicon cuando abrimos la pestaña Red en la sección Helmet .
var favicon = require("serve-favicon");

const app = express();

//Serve Favicon
app.use(favicon('favicon.ico'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//**************Middlewares******************
// morgan es un middleware de registro de solicitudes HTTP para Node.js que genera registros para cada solicitud de API. 
// Se puede usar un formato predefinido o crear uno nuevo según las necesidades.
app.use(morgan("common"))
//Helmet es un middleware de seguridad que protege las aplicaciones Express.js configurando varios encabezados HTTP.
app.use(helmet());
// permite al servidor aceptar solicitudes que provienen  de un origen diferene
app.use(cors())

app.use(limiter); //  apply to all requests
//--Limitadores de velocida
//  rate-limiter-flexible
//  express-brute
//  rate-limiter


// only apply to requests that begin with /api/
app.use("/api/", limiter);

app.get("/", (req, res) => {
  res.json({
    message: "Hello Stranger! How are you?",
  });
});
// Listen
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});


// whitelist
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));