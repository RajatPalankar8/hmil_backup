const app = require("./app");

const port = parseInt(process.env.PORT, 10) || 3000;
const httpolyglot = require('httpolyglot')

app.listen(port,()=> console.log(`SERVER IS  LISTENING On ${port}`));