const {Schema, model} = require('mongoose')

const ProveedorSchema = Schema({
    ID: {
        type: Number,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },

    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },

    direccion: {
        type: String,
        required: true,
    },

    telefono: {
        type: Number,
        required: true,
    }
    
})

//Exportar la función PermisoSchema
module.exports = model('Proveedor',ProveedorSchema)

