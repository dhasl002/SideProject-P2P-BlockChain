var smoke = require('../index')
var fs = require('fs');
const readline = require('readline');
var prompt = require('prompt');

process.stdin.setEncoding('utf8')

var readableStream = fs.createReadStream('BlockChain.txt');
var myFile = fs.createWriteStream('incoming.txt');

var node = smoke.createNode({
  port: parseInt(process.argv[2]) || 5000
, address: '10.252.123.137' //change to your ip address
, seeds: [{port: 5000, address:'10.252.123.137'}] //<-- You may need to change this address!
})

console.log('Port', node.options.port)
console.log('IP', node.options.address)
console.log('ID', node.id)

console.log('\nWelcome to the BlockChain!');
console.log('Options:');
console.log('1. Mine for currency');
console.log('2. Trade currency');

console.log('\nConnecting... please wait...\n');

node.on('connect', function() {
  console.log('Connected! Welcome to the BlockChain!\n');
})

node.on('disconnect', function() {
  console.log('Disconnected. Sorry.');
})

prompt.start();
prompt.get(['input'], function (err, result) {
	if(result.input == "1")
	{
		console.log('Searching for solution... \nThis may take a long time');
	}
	if(result.input == "2")
	{
		console.log('Enter the peer id that you would like to trade with');
	}
});

node.on('error', function(e) {throw e})
node.start()