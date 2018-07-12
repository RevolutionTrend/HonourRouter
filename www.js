const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let devices = [];

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use('/', function (req, res, next) {
    console.log(`req.path === ${req.path}.`);
    next();
});

app.get('/speed_info', function (req, res) {
    const speed = {
        up: Math.ceil(Math.random() * 512),
        down: Math.ceil(Math.random() * 1024)
    };
    console.log('speed_info: ' + JSON.stringify(speed));
    res.send(speed).end();
});

app.get('/device_list', function (req, res) {
    fs.open('./documents/devices.json', 'r+', function (err, fd) {
        if (err) {
            console.log(err);
            res.send([]).end();
            return;
        }
        let buf = new Buffer.alloc(10240);
        fs.read(fd, buf, 0, buf.length, 0, function (error, bytes) {
            if (error) {
                console.log(error);
                res.send([]).end();
                return;
            }
            const str = buf.slice(0, bytes).toString();
            devices = JSON.parse(str);
            fs.close(fd, function () {
                console.log('file close success');
            });
            res.send(devices).end();
        });
    });
});

app.get('/get_single_device', function (req, res) {
    const param = req.query;
    console.log(param);
    const device = devices.find((e) => e.macAddress === param.macAddress);
    res.send(device).end();
});

app.listen('8001', function () {
    console.log('runing on port 8001.')
});