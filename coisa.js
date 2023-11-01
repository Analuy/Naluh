const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

const dotenv=require('dotenv')


if(process.env.OMG === "DEV"){
    dotenv.config({path:'./config/.env.dev'})
}
if(process.env.OMG === "PROD"){
    dotenv.config({path:'./config/.env.prod'})
}


const modelodeUsuario = mongoose.model('contas', new mongoose.Schema({
    email: String,
    password: String
}))


mongoose.connect('mongodb://127.0.0.1:27017/qualquercoisa') // process.env.URL
 .then(()=>{

app.post('/get/:email', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne({email: req.body.email, password: req.body.password})
    console.log(usuarioEncontrado);
    if(usuarioEncontrado === null){
        return res.send('Sua conta não foi encontrada.')
    }
    res.send(usuarioEncontrado)
})
  
app.post('/post',async (req,res) =>{
    const usuarioCriado = await modelodeUsuario.create({email: req.body.email, password: req.body.password})
    res.send(usuarioCriado)
})

app.put('/put', async (req,res)=>{
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.newemail, password: req.body.newpassword})
    res.send({ message: "dados atualizados com sucesso!" })
})
  
app.delete('/delete', async (req,res)=>{
    const usuarioDeletado = await modelodeUsuario.deleteOne({email: req.body.email, password: req.body.password})
    res.send(usuarioDeletado)
})  

app.use((req,res)=>{
    res.send('Não foi possível encontrar sua rota')
})

app.listen(2800, ()=>console.log(`o servidor ta rodando, é nessa porta aqui ó: ${2800}`))

})