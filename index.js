const express=require('express');
const app=express();
app.listen(3000,()=>console.log("app is listening"));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
const Datastore=require('nedb');

const registerInfo=new Datastore('registerInfoFile.db');
registerInfo.loadDatabase();
const BookingInfo=new Datastore('bookingInfo.db');
BookingInfo.loadDatabase();
const ReviewInfo=new Datastore('reviewInfoFile.db');
ReviewInfo.loadDatabase();
const AdminInfo=new Datastore('AdminInfoFile.db');
AdminInfo.loadDatabase();
app.post('/api4',(req,res)=>{
    console.log("api4 is running");
    console.log(req.body);
    AdminInfo.insert(req.body);
    res.json({
        status: "successful",
    })
})
app.post('/api3',(req,res)=>{
    console.log("api3 is running");
    console.log(req.body);
    if(req.body.delete == 1){
        console.log("api3 deleted")
        console.log('returndelete');
        var recordIdToDelete=req.body.messageid;
        ReviewInfo.remove({ _id: recordIdToDelete }, {}, function (err, numRemoved) {
            if (err) {
                console.error('Error deleting record:', err);
            } else {
                console.log('Number of records deleted:', numRemoved);
            }
        });
        return;
    }else{
        console.log("nothing deleted");
    }
    ReviewInfo.insert(req.body);
    res.json({
        status: "successful",
    })
})
app.post('/api',(req,res)=>{
    console.log("api is running");
    console.log(req.body);
    
    console.log(req.body.delete);
    if(req.body.delete == 1){
        console.log('returndelete');
        var recordIdToDelete=req.body.userID;
        registerInfo.remove({ _id: recordIdToDelete }, {}, function (err, numRemoved) {
            if (err) {
                console.error('Error deleting record:', err);
            } else {
                console.log('Number of records deleted:', numRemoved);
            }
        });
        return;
    }else{
        console.log("not deleted");
    }
    registerInfo.insert(req.body);
    res.json({
        status: "successful",
    })
})

app.post('/api2',(req,res)=>{
    console.log("api2 is running");
    console.log(req.body.delete);
    if(req.body.delete==1){
        console.log('returndelete');
        var recordIdToDelete=req.body.eventid;
        console.log(req.body.eventID);
        BookingInfo.remove({ _id: recordIdToDelete }, {}, function (err, numRemoved) {
            if (err) {
                console.error('Error deleting record:', err);
            } else {
                console.log('Number of records deleted:', numRemoved);
            }
        });
        return;
    }else{
        console.log("not deleted");
        
    }
    BookingInfo.insert(req.body);
    res.json({
        status: "successful",
    })
})
app.get('/api2',(req,res)=>{
    BookingInfo.find({},(err,data)=>{
        if(err){
            res.end();
        return;
        }
        res.json(data);
    })
    
})
app.get('/api',(req,res)=>{
    registerInfo.find({},(err,data)=>{
        if(err){
            res.end();
        return;
        }
        res.json(data);
    })
    
})


app.get('/api3',(req,res)=>{
    ReviewInfo.find({},(err,data)=>{
        if(err){
            res.end();
        return;
        }
        res.json(data);
    })
    
})


app.get('/api4',(req,res)=>{
    AdminInfo.find({},(err,data)=>{
        if(err){
            res.end();
        return;
        }
        res.json(data);
    })
    
})

