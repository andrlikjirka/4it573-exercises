import http from 'http';
import fs from 'fs/promises';

const port = 3000;
const path = 'count.txt';

const server = http.createServer(async (req, res) => {

    const uri = req.url.slice(1);
    switch (uri) {
        case 'read':
            let count = await readCount(path);
            res.write(count.toString());
            res.statusCode = 200;
            break;
        case 'increase':
            res = await processCount(path, (i) => { return ++i }, res);
            break;
        case 'decrease':
            res = await processCount(path, (i) => { return --i }, res);
            break;
        default:
            res.write('Not Found');
            res.statusCode = 404;
    }
    res.end();
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

const processCount = async (path, process, res) => {
    try {
        const count = await readCount(path);
        const newCount = process(count);
        await fs.writeFile(path, newCount.toString());
        res.write('ok');
        res.statusCode = 200;
    } catch (err) {
        console.error(err.message);
        res.statusCode = 404;
    }
    return res;
};

const readCount = async (path) => {
    try {
        return parseInt((await fs.readFile(path)).toString());
    } catch (err) {
        console.error(err.message);
        return 0;
    }
}
