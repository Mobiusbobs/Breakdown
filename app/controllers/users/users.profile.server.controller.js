'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

exports.buyBlock = function(req, res) {
    var boughtList = req.user.boughtBlocks;

    var blockID = parseInt(req.params.blockId);

    console.log('Buying ...'+blockID);

    if(boughtList.indexOf(blockID)<0){
        req.user.boughtBlocks.push(blockID);
        req.user.save(function(err, user){

            if(err){
                console.error(err);
            }

            console.log('Bought! '+blockID);
            res.send(user);
        });
    }else{
        console.log('Already have it!');
        res.send(req.user);
    }
};

exports.addMyStory = function(req, res) {

    req.user.projects = req.body.blocks;
    req.user.save(function(err, user){

        if(err){
            console.error(err);
        }

        res.send(user);
    });
};

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};