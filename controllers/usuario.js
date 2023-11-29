const {response} = require('express')

//coso para usar bcrypt

//const bcrypt = require('bcrypt') //Encriptador
//const salt=10
//Permiso.nombre=bcrypt.hashSync(body.nombre, salt)


//Importación de los modelos
const Permiso = require('../models/usuario')

//Método GET de la API
const permisoGet1 = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los permisos
    const permisos = await Permiso.find()

    res.json({  //Respuesta en JSON
        permisos
    })   
}




const permisoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {_id} = req.query;
    //Consultar todos los usuarios
    try {
        let permisos;

        if (_id) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            permisos = await Permiso.find({ _id: _id });
        } else {
            // Si no se proporciona un id, consultar todos los clientes
            permisos = await Permiso.find();
        }

        res.json({ permisos });
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}


//Método POST de la api
const permisoPost = async(req, res) => {
    let mensaje = 'Insercion exitosa'
    const body = req.body //Captura de atributos
    try {
        const permiso = new Permiso(body) //Instanciando el objeto
        await permiso.save() //Inserta en la colección
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

//Juan Sebastián Granada

//Modifcación
const permisoPut1 = async(req, res = response) => {

    const {nombre, password, rol, estado} = req.body
    let mensaje = 'Modificación exitosa'
    try{
         await Permiso.findOneAndUpdate({nombre: nombre}, 
            {password: password, rol:rol, estado:estado})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}




const permisoPut = async(req, res) => {

    const {_id, ID, nombre, modulo} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Permiso.updateMany({_id: _id}, {$set: {
            ID: ID,
            nombre: nombre,
            modulo: modulo
        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}






//Eliminación
const permisoDelete = async(req, res) => {


    const {_id} = req.body
    let mensaje = 'La eliminiación se efectuó exitosamente.'

    try{
        const permiso = await Permiso.deleteOne({_id: _id})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    permisoGet,
    permisoPost,
    permisoPut,
    permisoDelete
}