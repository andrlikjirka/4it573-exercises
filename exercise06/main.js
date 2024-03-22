import express, {raw} from 'express';
import session from 'express-session';
import knex from "knex";
import knexfile from "./knexfile.js";

import method_override from 'method-override';

const port = 3000;
const app = express();
const db = knex(knexfile)

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: '4it573',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

// zaujal mne problém posílání pouze GET a POST z html formů, a vyzkoušel jsem řešení pomocí nalezené knihovny, která dokáže přemapovat post na specifikovanou metodu (?_method) a dovoluje tak používat klasické CRUD metody
app.use(method_override('_method'));

// middleware pro automatické přesměrování z root na todos (výpis tůdůček)
app.use((req, res, next) => {
    if (req.originalUrl === '/') {
        console.log(`Redirecting from / to /todos`);
        res.redirect('/todos');
    } else {
        next();
    }
});

app.get('/todos', async (req, res, next) => {
    const todos = await db('todos').select('*');
    res.render('index', {
        todos: todos,
        flashMessage: req.session.flash ? req.session.flash.message : ''
    });
});

app.post('/todos', async (req, res, next) => {
    const todo = {
        title: req.body.title,
        done: false,
        priority: req.body.priority
    };
    try {
        await db('todos').insert(todo);
    } catch (err) {
        return next(err);
    }
    req.session.flash = {message: `Tůdůčko \"${todo.title}\" přidáno.`};
    res.redirect('/');
});

app.get('/todos/:id', async (req, res, next) => {
    const todo = await db('todos').select('*').where('id', req.params.id).first();

    if (!todo) return next();

    res.render('todo', {
        todo: todo,
        flashMessage: req.session.flash ? req.session.flash.message : ''
    });
});

app.put('/todos/:id', async (req, res, next) => {
    let todo = await db('todos').select('*').where('id', req.params.id).first();

    if (!todo) return next();

    let flashMessage = '';

    if (req.body.title !== undefined && todo.title !== req.body.title) {
        const oldTitle = todo.title;
        await db('todos').update('title', req.body.title).where('id', todo.id);
        flashMessage += `Změněn název tůdůčka z \"${oldTitle}\" na \"${req.body.title}\".<br>`;
    }

    if (req.body.done !== undefined) {
        await db('todos').update('done', !todo.done).where('id', todo.id);
        flashMessage += `Změměn stav tůdůčka \"${todo.title}\" na ${!todo.done ? 'hotovo' : 'nehotovo'}.<br>`;
    }

    if (req.body.priority !== undefined && todo.priority !== req.body.priority) {
        await db('todos').update('priority', req.body.priority).where('id', todo.id);
        flashMessage += `Změněna priorita tůdůčka \"${todo.title}\" na ${req.body.priority}.`;
    }

    req.session.flash = {message: flashMessage};
    res.redirect('back');
});

app.delete('/todos/:id', async (req, res, next) => {
    const todo = await db('todos').select('*').where('id', req.params.id).first();

    if (!todo) return next();

    try {
        await db('todos').delete().where('id', todo.id);
    } catch (err) {
        return next(err);
    }
    req.session.flash = {message: `Tůdůčko \"${todo.title}\" bylo odebráno.`};
    res.redirect('/')
})

app.use((req, res, next) => {
   res.status(404);
   res.send('Tůdůčko nenalezeno :(');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Něco se nepovedlo :(');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
