const mongoose = require('mongoose');

mongoose.set('strictQuery', true)
.connect('mongodb://user_bd:jbxcIDuYKyZid4qB@ac-aerizjv-shard-00-00.iwzuh6l.mongodb.net:27017,ac-aerizjv-shard-00-01.iwzuh6l.mongodb.net:27017,ac-aerizjv-shard-00-02.iwzuh6l.mongodb.net:27017/backnodea?ssl=true&replicaSet=atlas-blq38k-shard-0&authSource=admin&retryWrites=true&w=majority', {
    
})
    .then(db => console.log("Conectado a DB"))
    .catch(err => console.log(err));