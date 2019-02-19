// http://www.cbr.ru/scripts/XML_daily.asp
// http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=02/03/2001&date_req2=14/03/2001&VAL_NM_RQ=R01235

const express = require("express");
const app = express();
const request = require('request');
const Iconv  = require('iconv').Iconv;
var parser = require('xml2json');
var cors = require('cors');
app.use(cors());

const convertToUtf8 = (body) => {
    body = new Buffer(body, 'binary');
    var iconv = new Iconv('windows-1251', 'UTF-8');
    return iconv.convert(body).toString();
}

const DAILY_CURRENCY_LIST_URL = 'http://www.cbr.ru/scripts/XML_daily.asp';

// http://localhost:3333/
app.get("/", (req, res) => {
    request({ uri: DAILY_CURRENCY_LIST_URL, method: 'GET', encoding: 'binary' }, (error, response, body) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(parser.toJson(convertToUtf8(body)));
    });
});

// http://localhost:3333/currency?code=R01020A&dateStart=12/12/2018&dateEnd=15/12/2018
app.get("/currency", (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!req.query.code) {
        throw new Error("NO CURRENCY CODE");
    };

    if (!req.query.dateStart) {
        throw new Error("NO START DATE");
    }

    if (!req.query.dateEnd) {
        throw new Error("NO END DATE");
    }

    request({
        uri: `http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${req.query.dateStart}&date_req2=${req.query.dateEnd}&VAL_NM_RQ=${req.query.code}`,
        method: 'GET',
        encoding: 'binary'
    }, (error, response, body) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(parser.toJson(convertToUtf8(body)));
    });
});

app.listen(3333);
console.log('currency proxy server started at 3333')