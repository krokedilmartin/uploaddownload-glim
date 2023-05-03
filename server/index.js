const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' }); // specify the upload directory

app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  console.log('file', file)
  if (!file) {
    res.status(400).send('No image uploaded.');
    return;
  }

  // do something with the uploaded file (e.g. save it to a database)

  res.send('Image uploaded successfully.');
});

app.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
    console.log('filePath', filePath)
  
    if (!fs.existsSync(filePath)) {
      res.status(404).send('File not found.');
      return;
    }
  
    res.sendFile(filePath);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
