const express = require("express");
const db = require('./database/database')
const port = 8000;
const Tasks = require('./models/tasks.models')

db.authenticate()
    .then(() => { 
        console.log('Base de datos conectada correctamente');
    })
    .catch(error => console.error(error));

db.sync()
    .then(() => console.log("Base de datos sincronizada"));

const app = express();

app.use(express.json());

// **** CRUD *** ///
//! >>>>>>>> CREATE **

app.post('/Tasks', async(req, res) => { 
    try { 
        const newTask = req.body;
        await Tasks.create(newTask);
        res.status(201).json();
    } catch (error){ 
        res.status(400).json(error);
    }
}),

//! >>>>>>>> READ **

app.get('/tasks', async(req, res) => { 
    try{ 
        const tasks = await Tasks.findAll();
        res.json(tasks);
    }catch{ 
        res.status(400).json(error);
    }
});

//! >>>>>> Buscar una tarea x su ID **

app.get('/tasks/:id', async(req, res) => { 
    try {
        const {id} = req.params;
        const task = await Tasks.findByPk(id);
        res.json(task);
    } catch (error) {
        res.status(400).json(error);
    }
});

// ! >>>>>>> UPDATE **

app.put('/tasks/:id', async(req, res) => { 
    try {
        const {id} = req.params;
        const taskInfo = req.body;
        const task = await Tasks.update(taskInfo, {
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

// ! >>>>>>> DELETE **

app.delete('/tasks/:id', async(req, res) => {
    try {
        const {id} = req.params;
        await Tasks.destroy({
            where: {id}
        });
        res.send(204).send()
    } catch (error) {
        res.status(400).json(error);
    }
});

app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor');
});

app.listen(port, () => {
    console.log("Server running in port " + port);
});
