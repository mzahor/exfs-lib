const rp = require('request-promise');

async function getMpegUrl(sourceUrl) {
    const response = await rp.get(sourceUrl);
    const page = response;

    const [, type, token] = /http:\/\/cdn\.ex-fs\.net\/(\w+)\/([a-zA-Z0-9]+)\/iframe.*/ig.exec(page);

    const iframeUrl = `http://cdn.ex-fs.net/${type}/${token}/iframe`;

    const mpegUrl = await rp.get(iframeUrl, {
        followRedirect: false,
    }).then(result => {
        throw new Error('Got unexpected result', result);
    }).catch(result => {
        if (result.statusCode === 302) {
            return result.response.headers.location;
        }

        throw result;
    });

    return mpegUrl;
}

getMpegUrl('http://ex-fs.net/series/85544-zateryannye-v-kosmose.html')
    .then(url => {
        console.log(url);
    });