const express=require('express')
//body parser is the middleware we used --> to print city on console
const bodyParser=require('body-parser')
const request=require('request');
const app=express()

const apiKey="a4f73865e30bc007568e6a38aee1f056";



//Express wont allow access to public/css file by default, 
///so we need to expose it with the following line of code:
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')



app.get('/',function(req,res){
    //res.send('hello world')
    res.render('index',{weather:null,error:null});
})

app.post('/',function(req,res)
{
    let city=req.body.city;
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url,function(err,response,body)
    {
        if(err)
        {
            res.render('index',{weather:null,error:'Please try again'})
        }else{
            let weather=JSON.parse(body)
            if(weather.main==undefined)
            {
                res.render('index',{weather:null,error:'Please try again'})
            }else{
                let weatherText=`It is ${weather.main.temp} degrees in ${weather.name}`
                res.render('index',{weather:weatherText,error:null})
            }
        }
    });

    //console.log(req.body.city);
    //helps to log city name into cmd
});


app.listen(3000,function(){
    console.log('Example app listening on port 3000');

})