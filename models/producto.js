const {Schema, model} = require('mongoose')

const ProductoSchema = Schema({
    ID: {
        type: Number,
        unique: true,
        required: [true, 'El ID es obligatorio']
    },

    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },
    descripcion: {
        type: String,
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },
    precio: {
        type: Number,
        required: [true, 'el precio es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    }


})

//Exportar la función PermisoSchema
module.exports = model('Producto',ProductoSchema)

