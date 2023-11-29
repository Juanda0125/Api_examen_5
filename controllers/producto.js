const {response} = require('express')

//coso para usar bcrypt

//const bcrypt = require('bcrypt') //Encriptador
//const salt=10
//Permiso.nombre=bcrypt.hashSync(body.nombre, salt)


//Importación de los modelos
const Producto = require('../models/producto')
const {generarJWT} = require('../helpers/generar_jwt')
const jwt = require('jsonwebtoken')



//Método GET de la API
const permisoGet1 = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los permisos
    const permisos = await Permiso.find()

    res.json({  //Respuesta en JSON
        permisos
    })   
}




const productoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {_id} = req.query;
    //Consultar todos los usuarios
    try {
        let productos;

        if (_id) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            productos = await Producto.find({ _id: _id });
        } else {
            // Si no se proporciona un id, consultar todos los clientes
            productos = await Producto.find();
        }

        res.json({ productos });
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}


//Método POST de la api
const productoPost = async(req, res) => {
    let mensaje = 'Insercion exitosa'

    let token="";

    const {id_producto} = req.body 

    const body = req.body //Captura de atributos


    try {
        const producto = new Producto(body) //Instanciando el objeto
        await producto.save() //Inserta en la colección

        if(id_producto !=""){
            token= await generarJWT(id_producto);
            res.cookie('token', token);  

            mensaje += (', el token es: '+token)

        }
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

//Juan

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




const productoPut = async(req, res) => {

    const {_id, ID, nombre, descripcion, precio} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Producto.updateMany({_id: _id}, {$set: {
            ID: ID,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,

        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}




//Eliminación
const productoDelete = async(req, res) => {


    const {_id} = req.query
    let mensaje = 'La eliminiación se efectuó exitosamente.'

    try{
        const producto = await Producto.deleteOne({_id: _id})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    productoGet,
    productoPost,
    productoPut,
    productoDelete
}