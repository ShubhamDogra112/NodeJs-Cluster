let io;
module.exports = {
	init: (httpServer) => {
		const { setupWorker } = require('@socket.io/sticky');
		const { createAdapter } = require('@socket.io/cluster-adapter');
		io = require('socket.io')(httpServer, {
			cors: {
				origin: 'http://localhost:8080',
				methods: [ 'GET', 'POST' ],
				credentials: true
			}
		});
		io.adapter(createAdapter());
		setupWorker(io);

		io.on('connection', (socket) => {
			console.log('Client connected: ' + socket.id);

			socket.on('test', () => {
				// socket.broadcast.emit('new_user', 'new user connected');
				io.emit('new_user', 'new user connected');
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
