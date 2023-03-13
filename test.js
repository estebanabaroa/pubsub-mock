const {create} = require('./pubsub-http-client-mock')

pubsubClient = create()

const peerId = Math.random().toString().replace('0.', '').substring(0, 4)

pubsubClient.pubsub.subscribe('test topic', console.log)
pubsubClient.pubsub.subscribe('test topic 2', console.log)

setInterval(() => {
  pubsubClient.pubsub.publish('test topic', `this is peer ${peerId} on 'test topic' at ${new Date().toString().split(' ')[4]}`)
}, 5000)

setInterval(() => {
  pubsubClient.pubsub.publish('test topic 2', `this is peer ${peerId} on 'test topic 2' at ${new Date().toString().split(' ')[4]}`)
}, 10000)

setInterval(() => {
  pubsubClient.pubsub.publish('not subbed', `you shouldnt see this`)
}, 3000)
