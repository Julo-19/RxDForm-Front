const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const imagePath = path.join(__dirname, 'uploads', req.file.filename);
    res.json({ success: true, imagePath });
  } else {
    res.status(400).json({ success: false, message: 'Aucun fichier trouvé.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
