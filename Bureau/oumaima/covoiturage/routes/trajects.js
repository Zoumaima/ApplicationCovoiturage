const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Traject = require('../models/traject');

// AJouter le traject 
router.post('/addtraject', (req, res, next) => {

  let newTraject = new Traject({
        /*
             posted_by: {     id: req.body.posted_by.id,
                              nom: req.body.posted_by.nom,
                              prenom: req.body.posted_by.prenom,
                              age: req.body.posted_by.age,
                              telephone: req.body.posted_by.telephone,
                              email: req.body.posted_by.email
                              

                         },

                  */     
              //email: req.body.email,             
              villeD : req.body.villeD,
              adresse_depart:req.body.adresse_depart,
              latD : req.body.latD,
              lngD:req.body.lngD,
              villeA : req.body.villeA,
              adresse_arrivee:req.body.adresse_arrivee,
              latA : req.body.latA,
              lngA:req.body.lngA,
              date_depart: req.body.date_depart,
              heure_depart: req.body.heure_depart,
              nbr_place: req.body.nbr_place,
              prix: req.body.prix,
              description: req.body.description,

                                     }); //Fin router.post...

//Ajout du traject

  Traject.addTraject(newTraject, (err, traject) => {

    if(err){
      res.json({success: false, msg:err});
    } else {
      res.json({success: true, msg:'Traject added'});
    }
  });
});


//Avoir la liste des trajects 

router.post('/trajectliste', (req, res, next) => {
 const id  = req.body.id ;
  Traject.getTrajectByProprietaire(id, (err, traject) => {
    if(err) throw err;

    if(traject) {

      res.json({

      traject:traject

    }

  )}
  else{
      return res.json({error: true, msg: 'Erreur de récuperation de trajects'});
  }

  });

});


router.get('/traject', (req, res, next) => {
 const id  = req.body.id ;
  Traject.getTraject((err, traject) => {
    if(err) throw err;

    if(traject) {

      res.json({traject:traject

      }

      

  )}
  else{
      return res.json({error: true, msg: 'Erreur lors de la recuperation'});
      }



  });



});



module.exports = router;
