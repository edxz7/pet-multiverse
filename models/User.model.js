const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'El email no tiene el formato esperado: algo@algo.com']
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User'
    },
    password: {
      type: String,
      required: true
    },
    pets: [ {  type: Schema.ObjectId, ref: 'Pet' } ]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
