import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  name: String,
  address: String,
  symbol: String,
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
