const multer = require("multer");
const path = require("path");
const middlewareMulter = multer({
    limits: {
        fileSize: 1024 * 1024 * 2
    },

    fileFilter: (req, file, callback) => {
        const tiposPermitidos = ["png", "jpg", "jpeg"];

        const tipo = file.mimetype.split("/")[1];

        const esImagenPermitida = tiposPermitidos.includes(tipo);

        if (esImagenPermitida) {
            callback(null, true);
        } else {
            callback(new Error("El archivo no es una imagen"), false);
        }
    },

    storage: multer.diskStorage({
        filename: (req, file, callback) => {
            callback(
                null,
                `IMG-${Date.now()}.${file.mimetype.split("/")[1]}`
            );
        },

        destination: (req, file, callback) => {
             callback(null, path.join(__dirname, "../uploads/profesionales"));
        }
    })
});

module.exports = middlewareMulter;