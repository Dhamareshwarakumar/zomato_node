const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log(`[MongoDB ${process.env.MONGO_SRC}] Connected`))
    .catch((err) => console.error(`[MongoDB ${process.env.MONGO_SRC}] Error: ${err}`));