const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const http = require('http');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} process started`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } 
  else {
    require("./worker");
  }