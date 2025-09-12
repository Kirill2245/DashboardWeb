exports.handleConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        socket.on('message', (data) => {
            console.log(`Message - ${data}`)
        })
    }
)};