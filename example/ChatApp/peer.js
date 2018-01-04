var smoke = require('../../index')
var fs = require('fs');
const readline = require('readline');
var prompt = require('prompt');

process.stdin.setEncoding('utf8')

var readableStream = fs.createReadStream('test.txt');
var myFile = fs.createWriteStream('incoming.txt');

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

var str = "";
prompt.start();
prompt.get(['input'], function (err, result) {
	if(result.input == "send")
	{
		console.log('  input: ' + result.input);
		readableStream.pipe(node.broadcast).pipe(myFile)
	}
});

node.on('error', function(e) {throw e})
node.start()