const passwordValidator = require('password-validator');
// Create a schema
const passwordSchema = new passwordValidator();


passwordSchema
    .is().min(8, 'The minimum length for a password is 8')
    .is().max(15, 'The maximum length for a password is 15')
    .has().digits(2,'Your password must have at least 2 digits')
    .has().uppercase(1, 'Your password must have at least one uppercase letter')
    .has().lowercase(1, 'Your password must have at least one lowercase letter')
    .has().not().spaces();

//Check password / compare with passwordSchema
module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        return res
            .status(400)
            .json({
            message: `Votre mot de passe ne remplit pas les critères: ${passwordSchema.validate('req.body.password', { list: true })}`
            })
    } else {
        next();
    }
}