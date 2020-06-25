const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const session = require("express-session");
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
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000 * 50 * 5
    }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/area/public'));

app.use("/account", require("./controllers/accountC"));
app.get('/', async(req, res) => {
    if (req.session.Role == 2)
    {
        res.render('admin/home/index',{layout:"layoutadmin.hbs"});
    }
    else
    {
        
    }
    
})

app.listen(port);
console.log('server running on port 4444');