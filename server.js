require('dotenv').config({ path: ".env" })
const http = require('http');
const socketio = require("socket.io");
const app = require('./app');
const server = http.createServer(app);
const io = socketio(server);
const Filter=require('bad-words');
const filter=new Filter();



io.on("connection",(socket)=>{ 
socket.on("chat", (obj, cb) =>{
// event acknowledgement
if(filter.isProfane(obj.text)){
return cb("profanity is not allowed.")
}  io.emit("messages",obj) 

})

   }) 



server.listen(process.env.PORT, () => {
  console.log("server listening on port " + process.env.PORT);
});




//client a emit something in event "chat"
//server listens to event "chat"
  //sever could: broadcast.emit OR io.emit to event "message"
  //clients will listen to event "message" => setState => render
  //