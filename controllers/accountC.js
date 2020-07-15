const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const accountM = require("../models/AccountsM");
<<<<<<< Updated upstream

=======
var dateFormat = require('dateformat');
>>>>>>> Stashed changes
// router.use(passport.initialize());
// router.use(passport.session());
// router.use(require('../config/passport')(passport));

router.get("/createAccount", function(req, res) {
    res.render("account/createAccount", { layout: false });
})
router.get("/login", function(req, res) {
    if (req.session.user) res.redirect('/');
    else {
        res.render("account/login", { layout: false });
    }

})


router.post('/login', async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;
<<<<<<< Updated upstream
        
=======
     
>>>>>>> Stashed changes
        const user = await accountM.getByUsername(username);
        if (user === null) {
            res.render('account/login', { error: 'Username không tồn tại!', layout: false });
            return false;
        }
        bcrypt.compare(password, user.Password, function(err, result) {
            if (result == true) {
<<<<<<< Updated upstream
                console.log(user)
=======
               
>>>>>>> Stashed changes
                req.session.user = user.Id;
                req.session.email = user.Email;
                req.session.username = user.UserName;
                req.session.Role=user.Role;           
                res.redirect('/');
                return true;
            } else {
                res.render('account/login', { error: 'Mật khẩu của bạn không đúng!', layout: false });
                return false;
            }

        }); // true




    })
    // router.post('/createAccount', passport.authenticate('local-signup', {
    //         successRedirect: '/',
    //         failureRedirect: '/account/createAccount',
    //         failureFlash: true
    //     }))
router.post('/createAccount', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
<<<<<<< Updated upstream
  
=======
    
>>>>>>> Stashed changes
    bcrypt.hash(password, bcrypt.genSaltSync(10),async function(err, hash) {
        
        var user = {
            Id: null,
            FullName: req.body.name,
            Email: req.body.email,
<<<<<<< Updated upstream
            BirthDay: req.body.DOB,
=======
            BirthDay: dateFormat(new Date(req.body.DOB), "yyyy-mm-dd"),
>>>>>>> Stashed changes
            Address:req.body.address,
            Phone:req.body.phone,
            UserName:username,
            Password: hash,
          
        };
        const uEmail = await accountM.getByEmail(req.body.email);
        if (uEmail != null) {
    
            res.render('account/createAccount', { error: "Email đã tồn tại", layout: false, user: user });
            return false;
        }
<<<<<<< Updated upstream
=======
        const checkusername = await accountM.getByUsername(req.body.username);
        if (checkusername != null) {
    
            res.render('account/createAccount', { error: "UserName đã tồn tại", layout: false, user: user });
            return false;
        }
>>>>>>> Stashed changes
    
        const uId = await accountM.add(user);
    
        if (uId) res.redirect('/account/login');
        else {
            res.render('account/createAccount', { error: "Đăng ký thất bại", layout: false, user: user });
            return false;
        }
        
    });

  
})

router.get('/profile', async(req, res) => {
    if (!req.session.user) {
        res.redirect("/account/login");
        return false;
    }
    
<<<<<<< Updated upstream
        let profile = await accountM.getByEmail(req.session.email);
        let listevaluate=await evaluateM.getbyUserID(req.session.user);
        let auc_list_win =await  auc_list_winM.getbyUserID(req.session.user);
        res.render('account/profile', {
            listevaluate:listevaluate,
            auctionlist:auctionlist,
            watchlist:watchlist, 
            profile: profile, 
            session: req.session, 
            cats: cats,
            scored:profile.Scored_Report,
            auc_list_win:auc_list_win
=======
        let profile = await accountM.getByUsername(req.session.username);
       
        profile.BirthDay = dateFormat(new Date(profile.BirthDay), "yyyy-mm-dd");
        res.render('account/profile', {
           
            profile: profile, 
            session: req.session, 
           
>>>>>>> Stashed changes
         });
        return true;
})
router.post('/profile/info', async(req, res) => {
    if (!req.session.user) {
        res.redirect("/account/login");
        return false;
    }
    const Name=req.body.first_name;
    const Phone=req.body.phone;
    const Email=req.body.email;
<<<<<<< Updated upstream
    let DOB=req.body.DOB;
    const user={
        f_ID:req.session.user,
        f_Name:Name,
        Phone:Phone,
        f_Email:Email,
        f_DOB:DOB
=======
    let DOB=dateFormat(new Date(req.body.DOB), "yyyy-mm-dd");
    const user={
        Id:req.session.user,
        FullName:Name,
        Phone:Phone,
        Email:Email,
        BirthDay:DOB
>>>>>>> Stashed changes
    }
    const resultinfo=await accountM.update(user);
    res.redirect("/account/profile");
})
router.post('/profile/changepassword', async(req, res) => {
    if (!req.session.user) {
        res.redirect("/account/login");
        return false;
    }
    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const confirmnewpassword = req.body.confirmnewpassword;
<<<<<<< Updated upstream
    let profile = await accountM.getByEmail(req.session.email);
    if (newpassword!=confirmnewpassword)
    {
    
        res.render('account/profile', {auctionlist: auctionlist,watchlist:watchlist, profile: profile, session: req.session, cats: cats,error:"Mật khẩu xác nhận không đúng" });
        return false;
    }
    bcrypt.compare(password, profile.f_Password,  async(err, result)=> {
        if (result == true) {
            
            bcrypt.hash(newpassword, bcrypt.genSaltSync(10), async(err, hash)=> {

                user = {
                    f_ID: req.session.user,                  
                    f_Password: hash,                 
=======
    let profile = await accountM.getByUsername(req.session.username);
    if (newpassword!=confirmnewpassword)
    {
    
        res.render('account/profile', { profile: profile, session: req.session,error:"Mật khẩu xác nhận không đúng" });
        return false;
    }
    bcrypt.compare(password, profile.Password,  async(err, result)=> {
        if (result == true) {
            
            bcrypt.hash(newpassword, bcrypt.genSaltSync(10), async(err, hash)=> {
                console.log("OK")
                user = {
                    Id: req.session.user,                  
                    Password: hash,                 
>>>>>>> Stashed changes
                };
                const update = await accountM.update(user);
                if (update)
                {
<<<<<<< Updated upstream
                    res.render('account/profile', {auctionlist:auctionlist,watchlist:watchlist,profile: profile, session: req.session, cats: cats, success: 'Mật khẩu đổi thành công!' });
=======
                    res.render('account/profile', {profile: profile, session: req.sessions, success: 'Mật khẩu đổi thành công!' });
>>>>>>> Stashed changes
                    return true;
                } 
                else return false;
            });
           
        } else {
<<<<<<< Updated upstream
            res.render('account/profile', { watchlist:watchlist,profile: profile, session: req.session, cats: cats,error: 'Mật khẩu hiện tại không đúng!' });
=======
            res.render('account/profile', { profile: profile, session: req.session,error: 'Mật khẩu hiện tại không đúng!' });
>>>>>>> Stashed changes
            return false;
        }

    }); // true
})


router.get('/logout', (req, res) => {
    if (req.session) {
        //delete sesstion object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        })
    }
})

router.get("/forgotpassword/:id",async (req,res)=>{
    const id=req.params.id;
    res.render("account/reserpassword",{layout:false,id:id});
});
router.post("/resetPassword",async (req,res)=>{
    const newpassword=req.body.newpassword;
    const confirmnewpassword=req.body.confirmnewpassword;
    const id=req.body.id;
    
    var user;
    if (newpassword==confirmnewpassword)
    {
        bcrypt.hash(newpassword, bcrypt.genSaltSync(10), async function(err, hash) {

            user = {
                f_ID: id,              
                f_Password: hash,              
            };
            let result=await accountM.update(user);
        });
       
      
        res.redirect('/account/login');
        return;
    }
    res.render("account/reserpassword",
    {
        layout:false,id:id,
        error:"Reser mật khẩu thất bại!"
    })
})
router.post("/forgotpassword",async (req,res)=>{
    const email=req.body.email;
    const user=await accountM.getByEmail(email);
    
    var transporter =  nodemailer.createTransport({ // config mail server
      
        service: 'Gmail',
        auth: {
            user: 'daugiahanghoa24h@gmail.com',
            pass: 'Daugia24h'
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'daugiahanghoa24h@gmail.com',
        to: `${email}`,
        subject: 'Recover Password',
        text: 'You recieved message from ' + req.body.email,
        html: `<a href="http://localhost:4444/account/forgotpassword/${user.f_ID}">Click here change password</a>`
    }
    let info=await transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
    res.redirect('/account/login');
});
//admin


module.exports = router;