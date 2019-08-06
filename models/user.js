var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    key_id: { type: String, required: true, unique: true },
    naver_id: { type: String },
    kakao_id: { type: String },
    name: String,
    tel: { type: String },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);
