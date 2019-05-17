const admin = require('firebase-admin');
const serviceAccount = require('./stack-online-table-tap-411fe9c5ffac.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

