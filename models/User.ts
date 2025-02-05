import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AddressSchema = new mongoose.Schema({
  addressLine1: { type: String, trim: true },
  addressLine2: { type: String, trim: true },
  city: { type: String, trim: true },
  postcode: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true },
  telephone: { type: String },
  telephone2: { type: String },
});

const ProfileSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  image: { type: String },
  addresses: { type: [AddressSchema], default: [] },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 4,
      trim: true,
    },
    profile: ProfileSchema,
    googleId: { type: String, sparse: true },
    isEmailVerified: { type: Boolean, default: false },
    roles: {
      type: [String],
      default: ["customer"],
      enum: [
        "superAdmin",
        "customer",
        "admin",
        "salesAssociate",
        "warehouseWorker",
        "deliveryDriver",
        "affiliate",
      ],
    },
    status: {
      type: String,
      default: "active",
      enum: [
        "active",
        "notActive",
        "pending",
        "approved",
        "rejected",
        "archived",
      ],
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
