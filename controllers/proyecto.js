const {response} = require('express')

//coso para usar bcrypt

//const bcrypt = require('bcrypt') //Encriptador
//const salt=10
//Permiso.nombre=bcrypt.hashSync(body.nombre, salt)


//Importación de los modelos
const Proyecto = require('../models/proyecto')
const {generarJWT} = require('../helpers/generar_jwt')
const jwt = require('jsonwebtoken')



//Método GET de la API

const proyectoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {id, numeroIntegrantes} = req.query;
    //Consultar todos los usuarios
    try {
        let proyectos;

        if (id) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            proyectos = await Proyecto.find({ id: id });
        }
        else if(numeroIntegrantes){
            proyectos = await Proyecto.find({ numeroIntegrantes: numeroIntegrantes });
        }
         else {
            // Si no se proporciona un id, consultar todos los clientes
            proyectos = await Proyecto.find();
        }


        res.json({ proyectos });
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}




//Método POST de la api
/*
const proyectoPost = async (req, res) => {
  let mensaje = 'Inserción exitosa';
  let token = '';

  const { id_proyecto } = req.body;

  try {
    const response = await fetch('https://www.datos.gov.co/resource/mcec-87by.json');
    const data = await response.json();
    
    const valorDolar = parseFloat(data[0].valor);

    const proyecto = new Proyecto({ ...req.body, valorDolar });

    await proyecto.save();

    if (id_proyecto !== '') {
      token = await generarJWT(id_proyecto);
      res.cookie('token', token);

      mensaje += (', el token es: ' + token);
    }
  } catch (error) {
    mensaje = 'Error en la inserción';
    console.error(error);
  }

  res.json({
    msg: mensaje,
  });
};
*/



const proyectoPost = async(req, res) => {
    let mensaje = 'Insercion exitosa'

    let token="";

    const {id_proyecto} = req.body 

    const body = req.body //Captura de atributos


    try {
        const proyecto = new Proyecto(body) //Instanciando el objeto
        await proyecto.save() //Inserta en la colección

        if(id_proyecto !=""){
            token= await generarJWT(id_proyecto);
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



//Modifcación
const proyectoPut = async(req, res) => {

    const {_id, id, nombre, horasDedicadas, valorProyecto, numeroIntegrantes} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Proyecto.updateMany({id: id}, {$set: {
            nombre: nombre,
            horasDedicadas: horasDedicadas,
            valorProyecto: valorProyecto,
            numeroIntegrantes: numeroIntegrantes

        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}



//Eliminación
const proyectoDelete = async (req, res) => {
    const { id } = req.query;
    let mensaje = 'La eliminación se efectuó exitosamente.';
  
    try {
      const proyecto = await Proyecto.deleteOne({ id: id });
    } catch (error) {
      mensaje = 'Se presentaron problemas en la eliminación.';
    }
  
    res.json({
      msg: mensaje
    });
  };
  



module.exports = {
    proyectoGet,
    proyectoPost,
    proyectoPut,
    proyectoDelete
}
