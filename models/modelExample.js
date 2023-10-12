var mongoose = require('mongoose');

var ExampleSchema = new mongoose.Schema({
    variable_1:     { type: String },
    variable_2:     { type: String },
    variable_3:     { type: String },
    variable_4:     { type: String }
  },{autoCreate:true});
  
  ExampleSchema.set('toJSON', { virtuals: true });

var Example = mongoose.model('nombreTabla',ExampleSchema);

exports = module.exports = Example;