const fs = require('fs');
const db = require('quick.db');
const total = db.get('requests');

if (total === null) {
  db.set('requests', 507);
};

module.exports = function (app){
  fs.readdirSync(__dirname).forEach(function(file){
    if (file === "index.js") return;
    let name = file.substr(0, file.indexOf("."));
    const plugin = require(`./${name}`);
    app.get(`/${plugin.name}`, async (req, res) => {
      console.log(`IP: ${req.headers['x-forwarded-for']}, Route: ${req.url}, Req: ${db.get('requests')}`);
      plugin.run(req, res);
      db.add('requests', 1)
     });
  })
};
/*
req.ip = repl ip
req.headers['x-forwarded-for'] = client ip
*/
