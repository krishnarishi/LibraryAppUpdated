const express = require('express');
const signinRouter  = express.Router();
const { check, validationResult } = require('express-validator');

function router(indexNav) {
    const loginValidation = [
        check('email')
            .isEmail()
            .withMessage('Invalid Email format'),
        check('password')
            .isLength({ min: 10 })
            .withMessage('Password Length must be greater than 10')
      ]
    signinRouter.get('/', function(req,res) {
        res.render("signin", {
            indexNav,
            title : 'Library',  
            errors: []  
        }); 
           
    });
    signinRouter.post('/',  loginValidation, function(req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('ERRORS :: ', errors);
            res.render("signin", {
                indexNav,
                title : 'Library',
                errors: errors.array()
            }); 
            res.status(500).json({ errors: errors.array() })
            // return res.status(500).json({ errors: errors.array() })
        } else {
            res.redirect('/books');
        }
    });
    return signinRouter;
};
module.exports = router;
