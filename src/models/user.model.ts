import { Schema, model } from 'mongoose';
import { UserInterface } from 'interfaces/user.interface';
import * as bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
}, { timestamps: true })

userSchema.pre<UserInterface>('save', async function (next) {
  const user = this

  if(!user.isModified('password')) {
    return
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

export default model<UserInterface>('User', userSchema);
