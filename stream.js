'use strict'

const spawn = require('child_process').spawn;
const WebSocket = require('ws');
const Splitter = require('stream-split');
const url = require('url');

class PiCamWebStream {
    constructor(server, width, height) {
        this.width = width;
        this.height = height;
        this.wss = new WebSocket.Server({ server });
        this.vid_stream = spawn('raspivid', ['-t', '0', '-w', width, '-h', height, '-fps', '12', '-o', '-', '-pf', 'baseline']);
        this.readStream = undefined;
        this.initListeners();
        this.NALseparator = new Buffer([0,0,0,1]);
    }

    initListeners() {
        this.wss.on('connection', socket => {
        
            socket.send(JSON.stringify({
                action : "init",
                width  : this.width,
                height : this.height
            }));
        
            socket.on('message', data => {
                var cmd = "" + data, action = data.split(' ')[0];
                console.log("Incomming action '%s'", action);
        
                if (action === "REQUESTSTREAM") {
                    this.startFeed();
                }
                
                if (action === "STOPSTREAM") {
                    this.readStream.pause();
                }
            });
        
            socket.on('close', () => {
                console.log('killing ' + this.vid_stream.pid);
                this.vid_stream.kill();
            });
        
        });
            
        this.wss.on('message', msg => {
            console.log('received: %s', msg);
        });
    }

    broadcast(data) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: true }, err => {
                    if (err) throw err;
                });
            }
        });
    }

    startFeed() {
        console.log('start_feed');
        //vid_stream.stdout.pipe(process.stdout);
        this.readStream = this.vid_stream.stdout.pipe(new Splitter(this.NALseparator));
        this.readStream.on('data', data => {
            this.broadcast(data);
        });
    }

    kill() {
        this.vid_stream.kill();
    }
}

module.exports = PiCamWebStream;