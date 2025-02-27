import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  address: String,
  private_key: String,
  mnemonic: String,
});
// PassWord ReHash MiddleWare
userSchema.pre("save", async function (next) {
  // If the Password was Modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
// New User
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  //PassWord Change Timestamp
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// Query optimization
userSchema.pre(/^find/, function (next) {
  // this points to the current query filtering inactive users
  this.find({ active: { $ne: false } });
  next();
});

//Checking candidatePassword with hashed password in DB
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//Check whether password was changed after issuing the token
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password was Tampered
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
