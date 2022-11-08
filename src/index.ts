import { app } from './server';

const PORT = 3333;

app.listen(3333, () => console.log(`Server is running! Port: ${PORT}`))