import express from 'express';

const app = express();
const PORT = 3011;

app.listen(PORT, () =>{
console.log(`listening on ${PORT}`);
});
