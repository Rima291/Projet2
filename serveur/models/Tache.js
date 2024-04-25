const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
      
    },
    namedeveloppeur: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true, 
    },
});

const Tache = mongoose.model('Tache', TacheSchema);

module.exports = Tache;
