const ZarinPal = require("zarinpal-node-sdk");

const zarinpal = new ZarinPal({
    merchantId: process.env.ZARINPAL_MERCHANT_ID,
    sandbox: true,
});

module.exports = zarinpal;