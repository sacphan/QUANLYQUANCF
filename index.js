const express = require("express");
const exphbs = require("express-handlebars")
const adminRouter = require('./routers/admin')
port = 4444,
app = express();

//use admin route
app.use('/admin', adminRouter);

//config express handlebar
const hbs = exphbs.create({
    defaultLayout: "layoutadmin",
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