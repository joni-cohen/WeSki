export const initSocket = (io: any) => {
    io.of()

    io.on('connection', (socket: any) => {

        socket.on("disconnect", () => {
            socket.leave(socket.id);
        });

        socket.on("error", () => {
            socket.emit("Error", "Connection Failed");
        });
    })
    return io;
}
