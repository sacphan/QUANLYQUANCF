const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const session = require("express-session");
const tableM = require("./models/TablesM");
const Handlebars=require("handlebars"); 
port = 4444,
app = express();
//config express handlebar
const hbs = exphbs.create({
    defaultLayout: "layoutclient",
    extname: 'hbs'
});
Handlebars.registerHelper('iff', function(a, operator, b, opts) {
    var bool = false;
    switch(operator) {
       case '==':
           bool = a == b;
           break;
       case '>':
           bool = a > b;
           break;
       case '<':
           bool = a < b;
           break;
       default:
           throw "Unknown operator " + operator;
    }
 
    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
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


app.use("/account", require("./controllers/accountC"));
app.use("/", require("./controllers/SaleC"));

app.get('/', async(req, res) => {
    
  
    if (req.session.Role == 2)
    {
       
        res.render('admin/home/index',
        {
            layout:"layoutadmin.hbs",
            
        });
    }
    else
    {
        if (req.session.user) 
        {
            const listTabless = await tableM.all();
            res.render('clients/home/index',{
                layout:"layoutclient.hbs",
                listTables: listTabless
        
        });
        }
        else
        {
            res.redirect("/account/login");
        }
    }
    
})

app.listen(port);
console.log('server running on port 4444');