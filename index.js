const fs = require("fs-extra");
const getIP = require('ipware')().get_ip;
const express = require("express");
const { message } = require("statuses");
const app = express();
var colors = require('colors');
app.use(require('express-status-monitor')());

require("./plugins")(app);
app.get("/", (req, res) => {
  res.json({msg : "hi"})
});

app.get('/*', (req, res) => {
  res.send({ status: "404", message: "Lựa chọn không hợp lệ" })
});
const obj = fs.readdirSync(__dirname + "/plugins");
const port = process.env.PORT || 3000;
var term = require( 'terminal-kit' ).terminal;
app.listen(port, () => {
term.slowTyping(
  '\n\nĐã load thành công api !!!\n' ,
  { flashStyle: term.brightWhite }
);
    console.log(
      ` ████████╗████████╗██╗░░██╗\n`.brightRed+
      ` ╚══██╔══╝╚══██╔══╝██║░██╔╝\n`.brightGreen+
      ` ░░░██║░░░░░░██║░░░█████═╝░\n`.brightYellow+
      ` ░░░██║░░░░░░██║░░░██╔═██╗░\n`.brightBlue+
      ` ░░░██║░░░░░░██║░░░██║░╚██╗\n`.brightCyan+
      ` ░░░╚═╝░░░░░░╚═╝░░░╚═╝░░╚═╝\n`.brightWhite
    )
    console.log("\n\nAuthor : ".brightWhite, "Thiệu Trung Kiên".brightGreen.bold)
    console.log("\n-------------------\n")
    console.log("Số lượng plugins : ".brightGreen + obj.length + " plugins\n".brightGreen)
    for(let i = 0; i < obj.length; i++){
          console.log("[ LOADING ] : ".brightGreen + obj[i].brightCyan)
  }
});

app.set('json spaces', 1);
