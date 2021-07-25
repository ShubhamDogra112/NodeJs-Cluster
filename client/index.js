const socket = io('http://localhost:4100', {
    withCredentials: true,
    query: {}
  });

setTimeout(() => {
    socket.emit("test")
}, 2000)

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