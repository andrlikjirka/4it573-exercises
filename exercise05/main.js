import express from 'express';
import session from 'express-session';

import method_override from 'method-override';

const port = 3000;
const app = express();

let todos = [
    {
        id: 1,
        title: 'Zajít na pivo',
        done: false
    },
    {
        id: 2,
        title: 'Vrátit se z hospody',
        done: false
    }
]

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

app.get('/todos', (req, res, next) => {
    res.render('index', {
        todos: todos,
        flashMessage: req.session.flash ? req.session.flash.message : ''
    });
});

app.post('/todos', (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        done: false
    };
    todos.push(todo);
    req.session.flash = {message: `Tůdůčko \"${todo.title}\" přidáno.`};
    res.redirect('/');
});

app.get('/todos/:id', (req, res, next) => {
    const todo = todos.find(todo => {
        return todo.id === Number(req.params.id)
    });

    if (!todo) return next();

    res.render('todo', {
        todo: todo,
        flashMessage: req.session.flash ? req.session.flash.message : ''
    });
});

app.put('/todos/:id', (req, res, next) => {
    let todo = todos.find(todo => {
        return todo.id === Number(req.params.id);
    });

    if (!todo) return next();

    if (req.body.title !== undefined) {
        const oldTitle = todo.title;
        todo.title = req.body.title;
        req.session.flash = {message: `Změněn název tůdůčka z ${oldTitle} na ${todo.title}`};
    }

    if (req.body.done !== undefined) {
        todo.done = !todo.done
        req.session.flash = {message: `Změměn stav tůdůčka \"${todo.title}\" na ${todo.done ? 'hotovo' : 'nehotovo'}.`};
    }

    // přesměrování zpět na stránku, ze které požadavek na update přišel, jednodušší varianta: res.redirect('back')
    const backlink = req.headers.referer;
    if (backlink) {
        res.redirect(backlink)
    } else {
        res.redirect('/');
    }
});

app.delete('/todos/:id', (req, res, next) => {
    let todo = todos.find(todo => {
        return todo.id === Number(req.params.id)
    })

    if (!todo) return next();

    todos = todos.filter(todo => {
        return todo.id !== Number(req.params.id);
    });
    req.session.flash = {message: `Tůdůčko \"${todo.title}\" bylo odebráno.`};
    res.redirect('/')
})

app.use((req, res, next) => {
   res.status(404);
   res.send('Tůdůčko nenalezeno :(');
});

app.use((err, req, res, next) => {
    res.status(500).send('Něco se nepovedlo :(');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
