const mongoose = require('mongoose');

const HotelSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    stars: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    amenities: { type: Array, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hotel', HotelSchema)