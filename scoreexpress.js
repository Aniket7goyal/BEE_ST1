const express=require('express');
var app=express();
const fs=require('fs');
const bodyParser=require('body-parser');
app.use(express.static('public'));

//urlencoded data:form ke data ko fill krne ke baad submit pe click krete hain toh top pe signs ko urlencoded data kehte hain
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/boot',function(request,response){
response.sendFile(__dirname+'/boot.html');

})


app.post('/form',function(request,response){
    var ids=request.body.id;
    var fnamee=request.body.fname;
    var addr =request.body.add;
    var English=Number(request.body.eng);
    var Hindi=Number(request.body.hindi);
    var Punjabi=Number(request.body.pun);
    var Maths=Number(request.body.maths);
    var Physics=Number(request.body.phy); 
    var Chemistry=Number(request.body.che);

    var total=Number(English+Hindi+Punjabi+Maths+Physics+Chemistry);
    var average=total/6;
    
    var grade = 'A';
    if(average>=90){
        grade='A';
    }else if(average>=80 && average<90){
        grade='B';
    }else if(average>=70 && average<80){
        grade='C';
    }else if(average>=55 && average<70){
        grade='D';
    }else if(average>=40 && average<55){
        grade='E';
    }else{
        grade='F';
    }

    

    let scoreCard = {
        'Student Id' : ids,
        'Student Name' : fnamee,
        'Address':addr,
        'English' : English,
        'Hindi' : Hindi,
        'Punjabi':Punjabi,
        'Maths' : Maths,
        'Physics':Physics,
        'Chemistry':Chemistry,
        'Total Marks' : total,
        'Average Marks' : average,
        'Grade':grade
    }

    
    
    fs.appendFileSync("abc.txt",JSON.stringify(scoreCard));
    const data = fs.readFileSync("abc.txt","utf-8")
   
    console.log(data);
    response.send(data);
})

app.listen(3000,()=>{
    console.log("Server started at 3000.")
})

    