import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const accountSchema = new Schema({
  privateKey: String,
  address: String,
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
