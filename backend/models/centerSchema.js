import mongoose from "mongoose";


import bcrypt from "bcrypt";
import validator from "validator";

const centerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["center"],
    default: "center",
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved','Denied'],
    default: 'Pending',
  },
  name: {
    type: String,
    required: [true, "Please enter the Center Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [50, "Name cannot exceed 50 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter the Center Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  type: {
    type: String,
    required: [true, "Please select the Center Type!"],
    enum: ["Arts", "Music", "Sports", "Cultural"],
  },
  address: {
    type: String,
    required: [true, "Please enter the Center Address!"],
  },
  phone: {
    type: String,
    required: [true, "Please enter the Center Phone Number!"],
    validate: {
      validator: function(value) {
        // Check if the phone number is exactly 10 digits and contains only digits
        return /^[6-9]\d{9}$/.test(value);
      },
      message: "Phone number must be exactly 10 digits long and contain only digits!",
    },
  },
  courses: [{
    name: {
      type: String,
      required: [true, "Please enter the Course Name!"],
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: [true, "Please enter the Course Duration!"],
    },
  }],

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

centerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

centerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Method to generate JWT token
centerSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
export const Center=mongoose.model("Center", centerSchema);

export default Center;