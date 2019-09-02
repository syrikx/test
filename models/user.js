var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/users");
 
autoIncrement.initialize(connection)

var userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telnumber: { type: String, required: true, unique: true },
    kakaoid: { type: String },
    naver_id: { type: String },
    kakao_id: { type: String },
    gender: { type: String },
    birthday: { type: String },
    affiliate : { type: String},
    homepage : { type: String}
});

// userSchema.plugin(autoIncrement.plugin, { model:'User', field: 'sequence_id', startAt:1});
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'sequence_id',
    startAt: 100001,
    incrementBy: 1
});

module.exports = mongoose.model('User', userSchema);
