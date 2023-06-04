const express = require('express');
const cors = require('cors');

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
      //console.log(response.data.results)
      const resultados = response.data.results;
      const pokemonPromises = resultados.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        const nombre = pokemonData.data.name;
        const imagenUrl = pokemonData.data.sprites.front_default;
        return { nombre, imagenUrl };
      });
      const pokemons = await Promise.all(pokemonPromises);
    //console.log(pokemons);
    return pokemons;

    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }
  }


  app.post('/APIREST', async (req, res) => {
    var limit = req.body.limit;
    var offse = req.body.offset;
    console.log(offse)
    console.log(limit)

    var data = await postData(limit,offse)
    //console.log(data)
  

    res.status(200).json(data );
  });
  

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});