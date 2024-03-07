import http from 'http';
import fs from 'fs/promises';

const port = 3000;
const path = 'count.txt';

const server = http.createServer(async (req, res) => {

    const uri = req.url.slice(1);
    let count = await getCount(path);
    let newCount;
    switch (uri){
        case 'read':
            res.write(count.toString());
            res.statusCode = 200;
            break;
        case 'increase':
            newCount = ++count;
            await fs.writeFile(path, newCount.toString());
            res.write('count increased');
            res.statusCode = 200;
            break;
        case 'decrease':
            newCount = --count;
            await fs.writeFile(path, newCount.toString());
            res.write('count decreased');
            res.statusCode = 200;
            break;
        default:
            res.statusCode = 404;
    }
    res.end();
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

async function getCount(path) {
    try {
        const count = await fs.readFile(path)
        return parseInt(count.toString());
    } catch (err) {
        console.error(err.message);
        return 0;
    }
}
