const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const axios = require('axios')
const router = express.Router();

const {
  CLOUD_NAME, API_KEY, API_SECRET
} = process.env

// Configurar Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: (req, file) => {
      const allowedFormats = ['jpg', 'jpeg', 'png'];
      const fileFormat = file.mimetype.split('/')[1];

      // Verificar si el formato del archivo es permitido
      if (allowedFormats.includes(fileFormat)) {
        return fileFormat;
      }

      // Si el formato no es permitido, lanza un error
      throw new Error('Formato de archivo no permitido. Solo se permiten archivos JPG, JPEG y PNG.');
    },
  },
});
const multerUpload = multer({ storage: storage });

router.post('/upload', multerUpload.single('file'), async (req, res) => {
  try {
    // La imagen se ha subido a Cloudinary, y req.file.path contiene la URL
    res.json({ secure_url: req.file.path });
  } catch (error) {
    console.error("Error al cargar la imagen a Cloudinary:", error);
    res.status(500).json({ error: "Error al cargar la imagen" });
  }
});

// router.delete('/delete', async (req, res) => {
//   try {
//     const imageUrl = req.body.imageUrl;

//     if (!imageUrl) {
//       return res.status(400).json({ error: 'La URL de la imagen no se proporcionó' });
//     }

//     const result = await cloudinary.uploader.destroy(imageUrl);
//     console.log('Eliminación exitosa:', result);

//     if (result === 'ok') {
//       res.status(200).json(result);
//     } else {
//       res.status(500).json({ error: 'Error al eliminar la imagen' });
//     }
//   } catch (error) {
//     console.error('Error al eliminar la imagen en Cloudinary:', error);
//     res.status(500).json({ error: 'Error al eliminar la imagen', details: error.message });
//   }
// });

module.exports = router;
