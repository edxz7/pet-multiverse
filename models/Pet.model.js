const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'unknown'],
        default: 'unknown'
    },
    kind: String,
    description: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        default: 'https://petforever.mx/wp-content/uploads/woocommerce-placeholder.png'
    }
})

const Pet = model('Pet', petSchema);

module.exports = Pet;