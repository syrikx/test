const axios = require('axios');
const { generateHmac } = require('./hmacGenerator');

const REQUEST_METHOD = "GET";
// const REQUEST_METHOD = "POST";
const DOMAIN = "https://api-gateway.coupang.com";
// const URL = '/v2/providers/affiliate_open_api/apis/openapi/reports/clicks?startDate=20190825&endDate=20190930';
const URL = '/v2/providers/affiliate_open_api/apis/openapi/reports/orders?startDate=20190815&endDate=20190930';
// const URL = '/v2/providers/affiliate_open_api/apis/openapi/v1/products/coupangPL?limit=2';

// Replace with your own ACCESS_KEY and SECRET_KEY
const ACCESS_KEY = "578aabe6-79a4-4562-84e0-6e7090002b06";
const SECRET_KEY = "4b1dfaa214e7aa189309ecb8f5c61fbd602235c2";

const REQUEST = {
    
};

(async () => {
    const authorization = generateHmac(REQUEST_METHOD, URL, SECRET_KEY, ACCESS_KEY);
    axios.defaults.baseURL = DOMAIN;

    try {       
        const response = await axios.request({
            method: REQUEST_METHOD,
            url: URL,
            headers: { Authorization: authorization },
            // data: REQUEST
        });
        console.log(response.data);
    } catch (err) {
        console.error(err.response.data);
    }    
})();