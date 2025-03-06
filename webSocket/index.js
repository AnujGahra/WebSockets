import http from "http";
import WebSocket ,{WebSocketServer} from "ws";

const server = http.createServer((req, res) => {
    console.log((new Date()) + "Received req for " + req.url);
    res.end("Hii there")
});


const wss = new WebSocketServer({server});
wss.on("connection", function connection(ws){
    ws.on("error", console.error);

    ws.on("message", function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary:isBinary})
            }
        })
    });

    ws.send("Hello connection message from ws server")
})

server.listen(8000,() => {
    console.log((new Date()) + "Server is Listening on port " + 8000); 
})