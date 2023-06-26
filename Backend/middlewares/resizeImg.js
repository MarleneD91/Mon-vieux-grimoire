
const sharp = require('sharp');
const path = require('path');
const fs = require('fs'); // FileSystem module

const resizeImg = (req, res,next) => {
    if(!req.file) { // What to do if no new file (//update ctrl)
        next();
    } else {
        const filename = req.file.filename.replace(/\.[^.]*$/,''); // Define filename (.replace : in order to remove previous extension)
        const mimetype = req.file.mimetype.split('/')[1];
        if (mimetype == "webp") {
            sharp(req.file.path)
                .resize(300, 500, 'inside') // Resize img
                .toFile(path.join('images',`resized-${filename}.webp`)) //Write output image data to a file
                .then(() => {
                    //
                    fs.unlink(req.file.path, () => { // Remove input file (from multer middleware)
                        req.file.path = path.join('images',`resized-${filename}.webp`); // callback : then save the resized file w/nex extension
                        next();
                    });
                })
                .catch(err => res.status(400).json({err}))
        } else {
            sharp(req.file.path)
            .resize(300, 500, 'inside') // Resize img
            .webp({ quality: 90 }) // define extension and quality
            .toFile(path.join('images',`resized-${filename}.webp`)) //Write output image data to a file
            .then(() => {
                //
                fs.unlink(req.file.path, () => { // Remove input file (from multer middleware)
                    req.file.path = path.join('images',`resized-${filename}.webp`); // callback : then save the resized file w/nex extension
                    next();
                });
            })
            .catch(err => res.status(400).json({err}))
        }
    }
};

module.exports = resizeImg;