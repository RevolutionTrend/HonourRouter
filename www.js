const express = require('express');
const app = express();
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


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

let devices = [{
    deviceName: 'Honour',
    interfaceType: 'lan',
    ipAddress: '192.168.1.2',
    isFamily: 1,
    macAddress: '00:0a:f7:88:80:b3',
    picture: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2094939883,1219286755&fm=179&app=42&f=PNG?w=121&h=140',
    accessTime: (new Date('2018-7-10 15:00:00')).toUTCString()
}, {
    deviceName: 'Unknown',
    interfaceType: '2.4G',
    ipAddress: '192.168.1.4',
    isFamily: 1,
    macAddress: '00:0a:f7:88:80:b5',
    picture: '',
    accessTime: (new Date('2018-7-10 14:08:00')).toUTCString()
}, {
    deviceName: 'Unknown',
    interfaceType: '5G',
    ipAddress: '192.168.1.6',
    isFamily: 1,
    macAddress: '00:0a:f7:88:80:b7',
    picture: '',
    accessTime: (new Date('2018-7-10 15:10:00')).toUTCString()
}, {
    deviceName: 'Unknown',
    interfaceType: 'lan',
    ipAddress: '192.168.1.8',
    isFamily: 1,
    macAddress: '00:0a:f7:88:80:b9',
    picture: '',
    accessTime: (new Date('2018-7-10 13:00:00')).toUTCString()
}];

app.get('/speed_info', function (req, res) {
    const speed = {
        up: Math.ceil(Math.random() * 512),
        down: Math.ceil(Math.random() * 1024)
    };
    console.log('speed_info: ' + JSON.stringify(speed));
    res.send(speed).end();
});

app.get('/device_list', function (req, res) {
    res.send(devices).end();
});

app.listen('8001', function () {
    console.log('runing on port 8001.')
});