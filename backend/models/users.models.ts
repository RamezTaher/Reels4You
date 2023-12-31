import { model, Schema, Document } from "mongoose"
import { omit } from "ramda"
import bcrypt from "bcryptjs"
import dayjs from "dayjs"

export interface UserDocument extends Document {
  username: string
  email: string
  password: string
  passwordResetToken: string
  passwordResetExpires: Date
  isVerified: boolean
  isAdmin: boolean
  expires?: Date

  matchPassword(enteredPassword: string): boolean
  hidePassword(): void
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetExpires: { type: Date, default: dayjs().toDate() },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  expires: { type: Date, default: dayjs().toDate(), expires: 43200 },
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.hidePassword = function () {
  return omit(["password", "__v", "_id"], this.toObject({ virtuals: true }))
}

export const User = model<UserDocument>("User", userSchema)

export default User
