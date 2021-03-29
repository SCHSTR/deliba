const mongoose = require('mongoose')

const reqString = {type: String, required: true}

const trackingSchema = mongoose.Schema({
    user_id: reqString,
    track_code: {type: String}
})

module.exports = mongoose.model('tracking-correios', trackingSchema)