const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      {db} = require("./config"),
      cors = require('cors'),
      http = require('http'),
      port = process.env.PORT || 4000
      routes = require("./routes");

app.use(cors());
app.use(routes);
app.use((req,res,next) => {
    let error  = new Error("Not found");
    error.status  = 404;
    next(error);
})

// global error handler
app.use((err,req,res,next) => {
    return res.status(err.status || 500).json({message:err.message || "Something went wrong"})
})

mongoose.connect(db.host , {useNewUrlParser:true , useUnifiedTopology:true})
.then(() => {
    let server = app.listen(port, () => {
        console.log(`Worker ${process.pid} started and connected to DB`);
    })
    const io = require("./socket").init(server);
})
.catch(err => {
    console.log(err);
})


//for load testing without clustered just run this file
// app.listen(4000, () => {
//     console.log("connectd to db");
// })
