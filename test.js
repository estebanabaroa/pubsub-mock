const {create} = require('./pubsub-http-client-mock')

pubsubClient = create()

const peerId = Math.random().toString().replace('0.', '').substring(0, 4)

pubsubClient.subscribe('test topic', console.log)
pubsubClient.subscribe('test topic 2', console.log)

setInterval(() => {
  pubsubClient.publish('test topic', `this is peer ${peerId} on 'test topic' at ${new Date().toString().split(' ')[4]}`)
}, 5000)

setInterval(() => {
  pubsubClient.publish('test topic 2', `this is peer ${peerId} on 'test topic 2' at ${new Date().toString().split(' ')[4]}`)
}, 10000)

setInterval(() => {
  pubsubClient.publish('not subbed', `you shouldnt see this`)
}, 3000)
