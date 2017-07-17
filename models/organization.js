var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationSchema = new Schema(
    {
        organizationCode: Number,
        organizationName: String
    },{ versionKey: false });

module.exports = mongoose.model('Organization', organizationSchema);