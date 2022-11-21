const mongoose = require('mongoose')

const JourneysSchema = new mongoose.Schema({
    origin:{
        type: String,
        required: [true, 'Please provide the origin of your journey'],
        minlength: 3,
        maxlength: 50,
    },
    destination:{
        type: String,
        required: [true, 'Please provide the destination of your journey'],
        minlength: 3,
        maxlength: 50,
    },
    load:{
        type: Number,
        required: [true, 'Please mention your cargo load'],
        maxlength: 10,
    },
    cargo:{
        type: String,
        required: [true, 'Mention your cargo'],
        minlength: 3,
        maxlength: 50,
    },
    vehicleType:{
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium',
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'Trucker',
        required: [true, 'Please proved trucker']
    }
},{timestamps:true}
)

module.exports = mongoose.model('Journeys', JourneysSchema)