const express = require('express');
const signupRouter  = express.Router();
const { check, validationResult } = require('express-validator');

function router(indexNav){
    const signupValidation = [
        check('name')
            .isLength({min: 3})
            .withMessage('Name Length must be greater than 3'),
        check('email') 
            .isEmail()
            .withMessage('Invalid Email format'),
        check('password')
            .isLength({ min: 10 })
            .withMessage('Password Length must be greater than 10'),
        check('confirmpassword')
            .isLength({ min: 10 })
            .withMessage('Password Length must be greater than 10'),
    ]
    
    signupRouter.get('/',function(req,res){
        res.render("signup", {
            indexNav,
            title : 'Library',
            errors: []
        });
    });

    signupRouter.post('/',  signupValidation, function(req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('ERRORS :: ', errors);
            res.render("signup", {
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

    return signupRouter;
}
module.exports = router;




