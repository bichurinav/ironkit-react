import express from 'express';
import fileUpload from 'express-fileupload';
import menuRouter from './api/menu.js';
import paramsRouter from './api/params.js';
import componentRouter from './api/component.js';
import usersRouter from './api/users.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));
app.use(express.static(path.join(path.resolve(), 'build')));
app.use('/api/menu', menuRouter);
app.use('/api/params', paramsRouter);
app.use('/api/component', componentRouter);
app.use('/api/users', usersRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен! [${PORT}]`);
});
