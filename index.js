const express = require("express");
const exphbs = require("express-handlebars"),

port = 4444,
app = express();
//config express handlebar
const hbs = exphbs.create({
    defaultLayout: "layout",
    extname: 'hbs'
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
//static file
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/area/public'));
app.get('/', async(req, res) => {
    res.render('account/login',{layout:null});
})

app.listen(port);
console.log('server running on port 4444');