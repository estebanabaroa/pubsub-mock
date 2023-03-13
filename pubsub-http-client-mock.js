const {io} = require('socket.io-client')
const port = 25963
const ioClient = socket = io(`ws://localhost:${port}`)

class IpfsHttpClient {
  constructor() {
    this.callbacks = []
    this.pubsub = {
      publish: async (topic, message) => {
        ioClient.emit(topic, message)
      },
      subscribe: (topic, callback) => {
        ioClient.on(topic, callback)
        this.callbacks.push(callback)
      },
      unsubscribe: async (topic) => {
        for (const callback of this.callbacks) {
          ioClient.off(topic, callback)
        }
      }
    }
  }
}

const create = () => new IpfsHttpClient()

module.exports = {create}
