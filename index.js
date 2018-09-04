const fs = require('fs');
const jsdom = require('jsdom');

const page = fs.readFileSync('./sample-page.html', 'UTF-8');

const dom = new jsdom.JSDOM(page);
const iframeSrc = dom.window.document.querySelector('#mcode_block iframe').src;

const groups = /http:\/\/cdn\.ex-fs\.net\/(\w+)\/([a-zA-Z0-9]+)\/iframe/ig.exec(iframeSrc);
const [, type, token]  = groups;

const url = `http://cdn.ex-fs.net/${type}/${token}/iframe`;
console.log(url);
