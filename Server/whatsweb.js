const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs')
const client = new Client({ authStrategy: new LocalAuth() });
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Event when the client is ready
client.on('ready', () => {
  console.log('Client is ready!');
});

// Event when the client is disconnected
client.on('disconnected', (reason) => {
  console.log(`Client disconnected: ${reason}`);
});

client.on('message', (message)=>{
    console.log(message.from);
    if(message.from === '9926685773'){
        
    }
})

// Start the client
client.initialize();