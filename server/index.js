import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import City from './models/cities.js';

const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL

function handleConnection() {
    mongoose.connect(MONGO_URL).then(() => {
        console.log('Conectado com sucesso!')
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    }).catch(error => {
        console.log('Erro ao conectar com banco');
        console.log(error);
        setTimeout(handleConnection, 10000)
    })
}

handleConnection()

app.get('/', (req, res) => {
    res.send('weather-api')
})

app.get('/cities', async (req, res) => {
    const { name } = req.query;

    try {
        const cities = await City.find({ name: { $regex: `^${name}`, $options: 'i' } }).limit(50);
        res.status(200).json({ cities });
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// TODO: Build application with Webpack and Babel