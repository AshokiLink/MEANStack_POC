var express = require('express');
var Organization = require('../models/organization');

var router = express.Router();

function errorHandler(res, reason, message, code){
    console.log('Error : ' + reason);
    res.status(code || 500).json({ error: message});
};

//api/organization
router.route('/organization')
    .get(function(req, res){        
        Organization.find(function(err, result){
            if(err){
                errorHandler(res, res.message, 'faild to get organizations.')
            }
            res.status(200).json(result);
        });
    })
    .post(function(req, res){
        if(!req.body.organizationName){
            errorHandler(res, 'Invaild user input', 'organization name is required', 400);
        }
        var organization = new Organization(req.body);

        organization.save(function(err, result,numAffected){
            if(err){
                errorHandler(res, err.message, 'faild to create a organization.')
            }

            res.status(201).json(result);
        });
    });

    //api/organization/:organizationCode
router.route('/organization/:organizationCode')
.get(function(req, res){ 
    var query = { organizationCode : req.params.organizationCode };
    Organization.findOne(query, function(err, result){
         if(err){
                errorHandler(res, err.message, 'faild to get a organization.')
            }

            res.status(200).json(result);
    });
})
.put(function(req, res){
    var query = { organizationCode: req.params.organizationCode };
    var updateData = req.body;

   Organization.update(query, updateData, function(err, result){
        if(err){
            errorHandler(res, err.message, 'faild to update a organization.');
        }
        res.status(200).json(result);
    });
})
.delete(function(req, res){
    var query = { organizationCode : req.params.organizationCode };
    Organization.remove(query, function(err, result){
        if(err){
            errorHandler(res, err.message, 'faild to delete a organization.');
        }
        res.status(200).json(result);
    });
});

//api/organization/:id
router.route('/deleteorganization/:id')
.delete(function(req, res){
    var query = { _id : req.params.id };
    Organization.remove(query, function(err, result){
        if(err){
            errorHandler(res, err.message, 'faild to delete a organization by id.');
        }
        res.status(200).json(result);
    });
})

module.exports = router;