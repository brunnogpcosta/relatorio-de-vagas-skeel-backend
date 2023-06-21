
const express = require('express')
const app = express()
const port = 3000
const data = require('./jobs.json')
const cors = require('cors');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.get('/positions', (req, res) => {
    return res.send({"jobs": data})
})

app.post('/positions/filter', (req, res) => {
    const { searchString, selectedLocales, selectedPositions, selectedExperiences } = req.body;
    const result = data.filter(dt => {
        const localeMatch = selectedLocales.length === 0 || selectedLocales.includes(dt.locale);
        const positionMatch = selectedPositions.length === 0 || selectedPositions.includes(dt.position);
        const experienceMatch = selectedExperiences.length === 0 || selectedExperiences.includes(dt.level);
        const searchMatch = dt.title.toLowerCase().includes(searchString.toLowerCase());

        return localeMatch && positionMatch && experienceMatch && searchMatch;
    });

    res.json({"jobs": result});
});

app.listen(port, () => {
    console.log(`service started on port ${port}`)
})
