import express from 'express';
import fileUpload from 'express-fileupload';
import menuRouter from './api/menu.js';
import paramsRouter from './api/params.js';
import componentRouter from './api/component.js';
const app = express();
const PORT = 25565;

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));

app.use('/api/menu', menuRouter);
app.use('/api/params', paramsRouter);
app.use('/api/component', componentRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен! [${PORT}]`);
});
