
const express = require('express')
const { format } = require('date-fns');

const app = express()
const port = 3000
const data = require('./jobs.json')
const cors = require('cors');


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.get('/positions', (req, res) => {
    try {
        const { format } = require('date-fns');

        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const paginatedData = data.slice(startIndex, endIndex).map(item => ({
          ...item,
          date: format(new Date(item.date), 'dd/MM/yyyy', { locale: require('date-fns/locale/pt-BR') })
        }));
        
        const response = {
          currentPage: page,
          totalPages: Math.ceil(data.length / limit),
          totalItems: data.length,
          itemsPerPage: limit,
          jobs: paginatedData
        };
        
        res.status(200).send(response);

    } catch (error) {
        return res.status(401).send("error: ", error);
    }

    
});


app.get('/options', (req, res) => {
    try {
        const type = req.query.type
        const result = data.map(item => item[`${type}`]);
        const orderResult = result.sort((a, b) => a.normalize("NFD").replace(/[\u0300-\u036f]/g, "").localeCompare(b.normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
    
        return res.status(200).send(orderResult);
    } catch (error) {
        return res.status(401).send("error: ", error);
    }

});


app.post('/positions/filter', (req, res) => {
    try {
        const { searchString, selectedLocales, selectedPositions, selectedExperiences } = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10000;
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
    
        const filteredData = data.filter(dt => {
            const localeMatch = selectedLocales.length === 0 || selectedLocales.includes(dt.locale);
            const positionMatch = selectedPositions.length === 0 || selectedPositions.includes(dt.position);
            const experienceMatch = selectedExperiences.length === 0 || selectedExperiences.includes(dt.level);
            const searchMatch = dt.title.toLowerCase().includes(searchString.toLowerCase());
    
            return localeMatch && positionMatch && experienceMatch && searchMatch;
        });
    
        const paginatedData = filteredData.slice(startIndex, endIndex);
    
        const response = {
            currentPage: page,
            totalPages: Math.ceil(filteredData.length / limit),
            totalItems: filteredData.length,
            itemsPerPage: limit,
            jobs: paginatedData
        };
    
        return res.status(200).send(response);
    } catch (error) {
        return res.status(401).send("error: ", error);
    }
   
});


app.listen(port, () => {
    console.log(`service started on port ${port}`)
})
