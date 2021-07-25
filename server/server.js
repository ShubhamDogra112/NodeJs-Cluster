const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
const { setupMaster } = require("@socket.io/sticky");
const { setupPrimary } = require("@socket.io/cluster-adapter");
const port = process.env.PORT || 4100;

cluster.schedulingPolicy = cluster.SCHED_RR;  //round robin
if (cluster.isMaster) {
    const httpServer = http.createServer();
  
    // setup sticky sessions
    setupMaster(httpServer, {
      loadBalancingMethod: "least-connection",
    });
  
    // setup connections between the workers
    setupPrimary();
    cluster.setupMaster({
      serialization: "advanced",
    });

    httpServer.listen(port, () => {
      console.log(`Master ${process.pid} process started on port: ${port}`);
    })
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