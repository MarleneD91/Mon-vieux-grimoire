
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const resizeImg = (req, res,next) => {
    const filename = req.file.filename.replace(/\.[^.]*$/,'');
    
    sharp(req.file.path)
     .resize(300, 500, 'inside')
     .webp({ quality: 90 })
     .toFile(path.join('images',`resized-${filename}.webp`))
     .then(() => {
        fs.unlink(req.file.path, () => {
            req.file.path = path.join('images',`resized${filename}.webp`);
            next();
        });
        //return res.status(200).json({message:'Livre créé'});
    })
     .catch(err => res.status(400).json({err}))

};

module.exports = resizeImg;