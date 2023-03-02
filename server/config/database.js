const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
// database connection event
db.on('connected', function() {
    console.log(`Mongoose connected to:${db.host}:${db.port}`);
});