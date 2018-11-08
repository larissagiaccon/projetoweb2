var url = 'mongodb://localhost:27017/test';

let user  = require('mongodb').MongoClient;

module.exports = class publicacaoFunc {
    static find() {
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                return db.collection('publications').find().toArray();
            }).catch((err) => {throw err; });
    }

    static insert(login, titulo, descricao) {
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                db.collection('publications').insertOne({'login':login, 'titulo':titulo, 'descricao':descricao});
            }).catch((err) => {throw err; });
    }

    static findByLogin(login){
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                return db.collection('publications').find({'login':login}).toArray();
            }).catch((err) => {throw err; });
    }

    static findBySearch(keyWord){
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                return db.collection('publications').find({'titulo': { "$regex": keyWord, "$options": "i" }}).toArray();
            }).catch((err) => {throw err; });
    }

 
};