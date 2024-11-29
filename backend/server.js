const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5001; //


app.use(cors());
app.use(express.json());

// Endpoint to save result.json
app.post('/save-result', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, '../frontend/src/result.json');

    // Check if file exists
    fs.readFile(filePath, (err, content) => {
        let existingData = [];
        if (!err) {
            existingData = JSON.parse(content);
        }

        // Append new record
        existingData.push(data);

        // Save updated data
        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving result.json:', writeErr);
                return res.status(500).send('Error saving file.');
            }
            res.status(200).send('File saved successfully.');
        });
    });
});

app.get('/result.json', (req, res) => {
    const filePath = path.join(__dirname, '../frontend/src/result.json');
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('result.json not found');
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
