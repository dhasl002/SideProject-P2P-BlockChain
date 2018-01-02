var smoke = require('../../index')

process.stdin.setEncoding('utf8')

var node = smoke.createNode({
  port: parseInt(process.argv[2]) || 5000
, address: '10.252.123.137'
, seeds: [{port: 5000, address:'10.252.123.137'}] //<-- You may need to change this address!
})

console.log('Port', node.options.port)
console.log('IP', node.options.address)
console.log('ID', node.id)

console.log('Connecting...');

node.on('connect', function() {
  console.log('Connected. Happy chatting!\n');
})

node.on('disconnect', function() {
  console.log('Disconnected. Sorry.');
})

var fs = require('fs');
var readableStream = fs.createReadStream('test.txt');

// Send message
readableStream.pipe(node.broadcast).pipe(process.stdout)
node.on('error', function(e) {throw e})
node.start()