const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Gopigo = require('node-gopigo').Gopigo;
const fs = require('fs');
const PythonShell = require('python-shell');
const removeAccents = require('remove-accents');
const path = require('path');
const PiCamWebStream = require('./PiCamWebStream');

server.listen(8080, () => {
    console.log('server running on port: ' + server.address().port);
});

app.use(express.static(__dirname));

var picam_stream = new PiCamWebStream(server, 960 / 2, 540 / 2, 12);

var prog_path = path.format({
    dir: __dirname,
    base: 'tmp.py'
});

var robot = new Gopigo.robot({
    minVoltage: 5.5,
    criticalVoltage: 1.2,
    debug: false
});

process.on('SIGINT', () => {
    robot.ledLeft.off();
    robot.ledRight.off();
    picam_stream.kill();
    process.exit();
});

var stop = () => {
    robot.motion.setLeftSpeed(255);
    robot.motion.setRightSpeed(255);
    robot.motion.stop();
};

var kill = () => {
    console.log('killing process ' + shell.childProcess.pid);
    stop();
    shell.childProcess.kill('SIGKILL');
    shell = undefined;
};

var shell;

robot.on('init', res => {
    if (res) {
        console.log('GoPiGo Ready!');
        
        robot.ledLeft.on();
        robot.ledRight.on();

        io.on('connection', socket => {
            socket.emit('voltage', robot.board.getVoltage());

            socket.on('run_python_program', code => {

                if (shell) kill();

                var c = removeAccents(`import gopigo as gpg\nimport time\n${code}`);

                fs.writeFile(prog_path, c, err => {
                    if (err) throw err;
                    else {
                        shell = new PythonShell('tmp.py', {scriptPath: __dirname, pythonOptions: ['-u']});

                        console.log('running program tmp.py');

                        shell.on('close', err => {
                            if (err) throw err;
                            else {
                                shell = undefined;
                                console.log('program execution terminated');
                            }
                        }); 

                        shell.on('message', msg => {
                            if (msg === '__picam__') {
                                console.info('new image captured');
                                socket.emit('picam');
                            } else {
                                console.info('print: ' + msg);
                                socket.emit('python_print', msg);
                            }
                        });

                        shell.on('receive', data => {
                            console.log(`received message: "${data}"`);
                            //socket.emit("python_print", msg);
                        });

                        shell.on('error', err => {
                            console.warn('Caught error: ' + err);
                        });
                    }
                });

                //console.log(`received python program: \n"${c}"`);
            });

            socket.on('stop_python_program', () => {
                if (shell){
                    kill();
                }
            });

            socket.on('toggle_left_led', state => {
                if (state) robot.ledLeft.on();
                else robot.ledLeft.off();
            });

            socket.on('move_angle', angle => {
                var right_speed = Math.floor(Math.cos(angle) * 255),
                    left_speed = 255 - right_speed;

                robot.motion.setLeftSpeed(left_speed);
                robot.motion.setRightSpeed(right_speed);

                if (angle < Math.PI) {
                    robot.motion.forward(false);
                } else {
                    robot.motion.backward(false);
                }
            });

            socket.on('stop', () => {
                stop();
            });

            socket.on('move', dir => {
                switch (dir) {
                    case 'up':
                        robot.motion.forward(false);
                        break;
                    
                    case 'down':
                        robot.motion.backward(false);
                        break;
                    
                    case 'left':
                        robot.motion.leftWithRotation();
                        break;

                    case 'right':
                        robot.motion.rightWithRotation();
                        break;
                }
            });
        });


    } else {
        console.log('Something went wrong during the init.');
    }
});

robot.on('error', function onError(err) {
    console.log('Something went wrong');
    console.log(err);
});

robot.on('free', function onFree() {
    console.log('GoPiGo is free to go');
});

robot.on('halt', function onHalt() {
    console.log('GoPiGo is halted');
});

robot.on('close', function onClose() {
    console.log('GoPiGo is going to sleep');
});

robot.on('reset', function onReset() {
    console.log('GoPiGo is resetting');
});

robot.on('normalVoltage', function onNormalVoltage(voltage) {
    console.log('Voltage is ok ['+voltage+']');
});

robot.on('lowVoltage', function onLowVoltage(voltage) {
    console.log('(!!) Voltage is low ['+voltage+']');
});

robot.on('criticalVoltage', function onCriticalVoltage(voltage) {
    console.log('(!!!) Voltage is critical ['+voltage+']');
});

robot.init();
