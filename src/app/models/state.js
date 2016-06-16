var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new Schema({
    name: String,
    month: String,
    state: String,
    permit: Number,
    permit_recheck: String,
    handgun: Number,
    long_gun: Number,
    other: String,
    multiple: Number,
    admin: Number,
    prepawn_handgun: String,
    prepawn_long_gun: String,
    prepawn_other: String,
    redemption_handgun: String,
    redemption_long_gun: String,
    redemption_other: String,
    returned_handgun: String,
    returned_long_gun: String,
    returned_other: String,
    rentals_handgun: String,
    rentals_long_gun: String,
    private_sale_handgun: String,
    private_sale_long_gun: String,
    private_sale_other: String,
    return_to_seller_handgun: String,
    return_to_seller_long_gun: String,
    return_to_seller_other: String,
    totals: Number,
}, { collection: 'firearms' });

module.exports = mongoose.model('State', StateSchema);
