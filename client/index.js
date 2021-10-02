const socket = io('http://localhost:4000', {
    withCredentials: true,
    transports: ["websocket"]
  });

setTimeout(() => {
  socket.emit("test")
}, 1000)

axios.get("http://localhost:4000/test")
.then(res => {
    console.log(res.data);
})
.catch(err => {
  console.log(err);
})

socket.on('new_user', (data) => {
  console.log(data);
})

socket.on('user_disconnected', (data) => {
  console.log(data);
})