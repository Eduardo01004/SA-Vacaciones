const express = require('express');
const cors = require('cors');
const { parseString } = require('xml2js');

const app = express();
const port = 3000;

const axios = require('axios');
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });

async function postData(limit,offset) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const results   = response.data.results;
    const pokemonPromises = results.map(async (pokemon) => {
    const pokemonData = await axios.get(pokemon.url);
    const name = pokemonData.data.name;
    const imagenUrl = pokemonData.data.sprites.front_default;
      return { name, imagenUrl };
    });
    const pokemons = await Promise.all(pokemonPromises);
  return pokemons;

  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error);
  }
}

/* peticion REST */

app.post('/APIREST', async (req, res) => {
  var limit = req.body.limit;
  var offse = req.body.offset;
  var data = await postData(limit,offse)
  res.status(200).json( data );
});

/* Peticion SOAP */
const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';
const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
<soapenv:Header/>
<soapenv:Body>
  <web:ListOfCountryNamesByCode/>
</soapenv:Body>
</soapenv:Envelope>
`;


app.get('/SOAPList', async (req, res) => {
  axios.post(url, soapRequest, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
    .then(response => {
      const xmlResponse = response.data;
      parseString(xmlResponse, (error, result) => {
        if (error) {
          console.error('Error al convertir la respuesta XML:', error);
          res.status(500).json({ error: 'Error al obtener los países' });
        } else {
          const countryList = result['soap:Envelope']['soap:Body'][0]['m:ListOfCountryNamesByCodeResponse'][0]['m:ListOfCountryNamesByCodeResult'][0]['m:tCountryCodeAndName'];
          const countries = countryList.map(country => ({
            countryCode: country['m:sISOCode'][0],
            countryName: country['m:sName'][0],
          }));

         res.status(200).json(countries);
        }
      });
    })
    .catch(error => {
      console.error('Error al hacer la petición SOAP:', error);
      res.status(500).json({ error: 'Error al obtener los países' });
    });

});



app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});