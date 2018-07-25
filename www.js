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

app.post('/edit_device', function (req, res) {
    const param = req.query;
    console.log(param);
    let device = devices.find(e => e.macAddress === param.macAddress);
    if (!device) {
        res.send({ result: 'failed' }).end();
        return;
    }
    device = Object.assign(device, {
        deviceName: param.deviceName,
        isFamily: parseInt(param.isFamily),
        isInBlackList: parseInt(param.isInBlackList),
        upLimit: parseInt(param.upLimit),
        downLimit: parseInt(param.downLimit),
        upLimitSpeed: parseInt(param.upLimitSpeed),
        downLimitSpeed: parseInt(param.downLimitSpeed)
    });
    fs.writeFile('./documents/devices.json', JSON.stringify(devices), function (err, fd) {
        if (err) {
            console.log(err);
            res.send({ result: 'failed' }).end();
            return;
        }
        res.send({ result: 'success' }).end();
    });

});

app.listen('8001', function () {
    console.log('runing on port 8001.')
});

const convertToString = obj => {
    switch (typeof obj) {
        case 'string':
            return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
        case 'array':
            return '[' + obj.map(convertToString).join(',') + ']';
        case 'obj':
            if (obj instanceof Array) {
                let strArr = [];
                const len = obj.length;
                for (let i = 0; i < len; i++) {
                    strArr.push(convertToString(obj[i]));
                }
                return '[' + strArr.join(',') + ']';
            } else if (null === obj) {
                return 'null';
            } else {
                let str = [];
                for (let propery in obj) {
                    str.push(convertToString(propery) + ':' + convertToString(obj[propery]));
                }
                return '{' + str.join(',') + '}';
            }
        case 'number':
        case 'boolean':
        default:
            return obj;
    }
}