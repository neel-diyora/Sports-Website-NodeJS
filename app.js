const express = require("express");  
 const path = require("path");
 const fs = require("fs");
 const app = express();
 const port = 8000; 

 //  EXPRESS SPECIFIC STUFF
 app.use('/static', express.static('static'));
 app.use(express.urlencoded());

// PUG SPECIFIC STUFF 
app.set('view engine', 'pug');   // set the template engine as pug
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS  
// app.get('/', (req, res)=>{
//     res.status(200).render('index.pug');
// });

app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
});

// -------------------------------------------------------------------------------------------------------------------

app.post('/contact', (req, res)=>{
    // console.log(req.body);
    name = req.body.name;
    phone = req.body.phone;
    email = req.body.email;
    address = req.body.address;
    consorn = req.body.desc;

    let outputToWrite = `the name of the client is ${name}, phone number is ${phone}, email is ${email}, residing at ${address}, consorn: ${consorn}`;
    fs.writeFileSync('output.txt', outputToWrite);

    const params = {'message': 'Your form has been submitted successfully'};
    res.status(200).render('contact.pug', params);
});

// -------------------------------------------------------------------------------------------------------------------

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

