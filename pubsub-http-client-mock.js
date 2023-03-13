const http = require('http')
const IoServer = require('socket.io')
const {io} = require('socket.io-client')
const port = 25963

// try creating the websocket server, will only work in node and if
// not already running, but that's ok only 1 needs to runs
// probably needs to be put in node only folder or webpack won't run
let server
let ioServer
const peers = []
try {
  server = http.createServer()
  server.on('error', e => console.log(`didn't create the socket.io server: ${e.message}`))
  ioServer = IoServer(server)
  server.listen(port, console.log)
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
}
catch (e) {
  console.log(`didn't create the socket.io server: ${e.message}`)
}

// the ioClient is required in the browser and node
const ioClient = socket = io(`ws://localhost:${port}`)

class IpfsHttpClient {
  constructor() {
    this.callbacks = []
  }
  async publish(topic, message) {
    ioClient.emit(topic, message)
  }
  subscribe(topic, callback) {
    ioClient.on(topic, callback)
    this.callbacks.push(callback)
  }
  unsubscribe(topic) {
    for (const callback of this.callbacks) {
      ioClient.off(topic, callback)
    }
  }
}

const create = () => new IpfsHttpClient()

module.exports = {create}
