let io;
module.exports = {
	init: (httpServer) => {
		io = require('socket.io')(httpServer, {
			cors: {
				origin: 'http://localhost:8080',
				methods: [ 'GET', 'POST' ],
				credentials: true
			}
		});

		io.on('connection', (socket) => {
			console.log('Client connected: ' + socket.id);

			socket.on('test', () => {
				socket.broadcast.emit('new_user', 'new user connected');
			});

			socket.on('disconnect', () => {
				console.log("disconnected");
				socket.broadcast.emit('user_disconnected', 'A user disconnected');
			 });
		});

		return io;
	},
	getIo: () => {
		if (!io) {
			throw new Error('Io is Not initialized');
		}
		return io;
	}
};
