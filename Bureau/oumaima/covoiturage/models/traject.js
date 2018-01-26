const mongoose = require('mongoose');
const config = require('../config/database');

// Traject  Schema
const TrajectSchema = mongoose.Schema({


  villeD: {type: String, required: true},
  adresse_depart: {type: String, required: true},
  latD: {type: String, required: true},
  lngD: {type: String, required: true},
  villeA: {type: String, required: true},
  adresse_arrivee: {type: String, required: true},
  latA: {type: String, required: true},
  lngA: {type: String, required: true},
  date_depart: {type: Date, required: true},
  heure_depart: {type: String, required: true},
  nbr_place: {type: Number, required: true, min: 1},

  prix: {type: Number, required: true, min: 0},
 
  description: {type: String, required: true},
  requested_by: [{
    id: {type: String, required: true, ref: 'User'},
    seatsRequired: {type: Number, required: true},
    created_at: {type: Date, default: Date.now()},
}],


});


const Traject = module.exports = mongoose.model('Traject', TrajectSchema);


module.exports.getTrajectByProprietaire = function(id, callback){
  const query = {'posted_by.id': id}
  Traject.find(query, callback);
}



module.exports.getTraject = function(callback){
  Traject.find(callback);
}


//Ajout du traject 
module.exports.addTraject = function(newTraject, callback){
      newTraject.save(callback);
};
