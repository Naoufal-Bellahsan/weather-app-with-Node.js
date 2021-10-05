const path = require("path");
const express = require("express");
const hbs=require('hbs')
const geoCode = require('./utils/geoCode')
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");       //static path
const viewsPath= path.join(__dirname, "../templates/views");         //views path
const partialsPath= path.join(__dirname, "../templates/partials");      //partials path
app.set('view engine', 'hbs')                                  //tell express to use hbs as temlating engine
app.set('views', viewsPath)                                    //tell express where to look for templates/views
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath));                  //tel express where to look for static
app.get("", (req, res) => {
  res.render('index',{
      title:'the weather app',
      name:'marouan'
  })
});

app.get("/about", (req, res) => {
    res.render('about',{
        title:'About',
        name:'marouan'
    })
  });

  app.get("/help", (req, res) => {
    res.render('help',{
        textHelper:'this is helpful text.',
        name:'marouan'
    })
  });
 
app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'you must provide an address'
    })
  }
  geoCode(req.query.address,(error,{latitud,longitud,location}={})=>{
    if(error){
      return res.send({error})
    }
       res.send({latitud,longitud,location,
      adress:req.query.address})
  })
  
});

app.get("/products", (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'you must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  });
});
app.get("/help/*", (req, res) => {
    res.send('article not found')
  });
app.get('*',(req,res)=>{
    res.render('404',{
        title:'page not found',
        name:'marouan'
    })
})
app.listen(3000, () => {
  console.log("server running in port 3000");
});
