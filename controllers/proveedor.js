const {response} = require('express')

//coso para usar bcrypt

//const bcrypt = require('bcrypt') //Encriptador
//const salt=10
//Permiso.nombre=bcrypt.hashSync(body.nombre, salt)


//Importación de los modelos
const Proveedor = require('../models/proveedor')

//Método GET de la API
/*
const permisoGet1 = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los permisos
    const permisos = await Permiso.find()

    res.json({  //Respuesta en JSON
        permisos
    })   
}
*/




const proveedorGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {_id} = req.query;
    //Consultar todos los usuarios
    try {
        let proveedores;

        if (_id) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            proveedores = await Proveedor.find({ _id: _id });
        } else {
            // Si no se proporciona un id, consultar todos los clientes
            proveedores = await Proveedor.find();
        }

        res.json({ proveedores });
    } catch (error) {
        console.error('Error al buscar:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}


//Método POST de la api
const proveedorPost = async(req, res) => {
    let mensaje = 'Insercion exitosa'
    const body = req.body //Captura de atributos
    try {
        const proveedor = new Proveedor(body) //Instanciando el objeto
        await proveedor.save() //Inserta en la colección
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}


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




const proveedorPut = async(req, res, response) => {

    const {_id, ID, nombre, direccion, telefono} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Proveedor.updateMany({ID: ID}, {$set: {
            nombre: nombre,
            direccion: direccion,
            telefono: telefono
        
        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}






//Eliminación
const proveedorDelete = async(req, res) => {


    const {ID} = req.query
    let mensaje = 'La eliminiación se efectuó exitosamente.'

    try{
        const permiso = await Proveedor.deleteOne({ID: ID})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    proveedorGet,
    proveedorPost,
    proveedorPut,
    proveedorDelete
}
