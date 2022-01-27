const express = require('express');
const app = express();
const PORT = 9999;

const fs = require('fs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  
  fs.readFile('./Userdata.json', 'utf-8', (err, json) => {

    res.render('index', { data: JSON.parse(json) })
    console.log(JSON.parse(json))
  })
})

app.get("/addpost", (req, res) => {
    res.render('add');
  
  })



app.post('/submit_data', (req, res) => {
  let usersjson = fs.readFileSync('./Userdata.json', "utf-8");
  let users = JSON.parse(usersjson);
  users.push(req.body);
  usersjson = JSON.stringify(users);
  fs.writeFileSync('./Userdata.json', usersjson, "utf-8");
  // console.log(req.body)
  res.redirect('/');

})

app.get("/delete/:id", function (req, res) {
    let a = [];
    fs.readFile('./Userdata.json', "utf-8", (err, data) => {
      if (err) throw err;
      a = JSON.parse(data)
      a.splice(req.params.id, 1)
      // console.log(a)
      fs.writeFile('./Userdata.json', `${JSON.stringify(a)}`, (err) => {
        if (err) throw err;
        res.end()
      })
      console.log(req.params.id)
  
    })
    res.redirect('back');
  });


  app.get("/update/:id", function(req, res) {
    let details = []
   const id = req.params.id;
    console.log(req.body.name)
     fs.readFile('./Userdata.json', (err, data) => {
       details = JSON.parse(data)
       res.render('edit', { data: details, id: req.params.id })
   
    res.end()
     app.post('/update_data',(req,res)=>{
        details[id].name=req.body.name
        details[id].email=req.body.email
        details[id].age=req.body.age
        details[id].city=req.body.city
        details[id].salary=req.body.contact;
        data=details
        fs.writeFile('./Userdata.json', `${JSON.stringify(data)}`, (err) => {
            if (err) throw err;
            res.end()
          })
          res.redirect('/');
    })
  
})
})





app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Work on ${PORT}`)
})