const http = require('http')
const IoServer = require('socket.io')
const port = 25963

let server
let ioServer
const peers = []
server = http.createServer()
ioServer = IoServer(server)
server.listen(port)
ioServer.on('connection', peer => {
  // save the peer
  peers.push(peer)
  // relay messages to all other peers
  peer.onAny((topic, message) => {
    for (const peer of peers) {
      peer.emit(topic, message)
    }
  })
})
