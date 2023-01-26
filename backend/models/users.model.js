import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Please provide a value as name of the user"],
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "This email is already in use"],
    lowercase: true,
  },

  
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [5, "The password should contain 5 characters at least"],
    // select: false,
  },

  confirm: {
    type: String,
    // required: [true, "Please provide a password"],
      minlength: [5, "The password should contains 5 characters at least"],
      validate: {
          validator: function (confirm) {
              return confirm === this.password
          },
          message: 'Passwords dont match!'
    }
    },
    userPic: String,
  
    isVerified: {type: Boolean, default: false},
  //   role: {
  //     type: String,
  //     enum: ['admin', 'user'],
  //     default: 'user'
  // },

  // passChangeDate: {
  //     type: Date
  // },

  // avtive: {
  //     type: Boolean,
  //     default: false
  // }

})


/** hash the password */
userSchema.pre('save', async function (next) {
  try {
      //run this function if password was modified (not on other update functions)
        if (!this.isModified('password')) return next();

        //hash the password
        this.password = await bcrypt.hash(this.password, 12);
        this.confirm = undefined;

        next();

    } catch (error) {
        next(error)
    }
});


/** check the password */
userSchema.methods.checkPassword = async (textPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(textPassword, hashedPassword)

    } catch (error) {
        next(error)
    }
}

userSchema.methods.changedPass = function (jwt_ts) {
    if (this.changedAt) {
        const changed_ts = this.changedAt.getTime() / 1000;
        //token generated before password change
        return jwt_ts < changed_ts  
    }

    return false;
}

export const User = model('User', userSchema);