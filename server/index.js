const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    nombreempleado: String,
    tipoUsuario:String,
    acceso:String,
    apellidoP: String,
    apellidoM: String,
    correo: String,
    rol: String,
    sede: String,
    area: String,
    sexo: Boolean,
    cumpleanos:Date,
    tipoTurno: Number,
},{
    timestamps: true
})

const userModel=mongoose.model("cronoControl",schemaData)

//read
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success:true, data:data})
})

//create data // save data in mondodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()

    res.send({success:true, message: "Dato guardado exitosamente", data : data})
})

//update date
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { id,...rest} = req.body
    console.log(rest)
    const data = await userModel.updateOne({_id: id},rest)
    res.send({success: true, message: "El dato se actualizo con exito", data : data})
})

//Delete date
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id: id})
    res.send({success: true, message: "El dato se elimino con exito", data : data}) 
})


mongoose.connect("mongodb://127.0.0.1:27017/cronoControl")
.then(()=>{
    console.log("conectado a DB")
    app.listen(PORT,()=>console.log("El sevidor esta funcionando"))
})
.catch((err)=>console.log(err))
