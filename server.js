const express = require('express');

const app = express();

app.use(express.static(`./dist/TicTacToe-Front`));
app.get(`/*`, function (req, res) {
  res.sendFile(`index.html`, {root: `dist/TicTacToe-Front/`}
  );
});
app.listen(process.env.PORT || 8080);
