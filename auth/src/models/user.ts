import mongoose from "mongoose";
import { Password } from "../utility/hashing";

// to define typescript what would be the structure of input object 
interface UserAttr{
  email:string;
  password:string;
}

// to make typescript recognize the static method defined over mongoDB model
interface UserModel extends mongoose.Model<UserDoc> {  // UserDoc -> telling typescript what would be structure of object returned by Model 
  build(attri:UserAttr):UserDoc; 
}

interface UserDoc extends mongoose.Document{  // defining to typescript sturcture of individual document (This defines what all attribute will returned object from model will contain)
  email:string
  password:string
}

const userSchema = new mongoose.Schema({
  email:{
    // types of property mentioned over here are linked to mongo not typescript
    type:String,   // String- a Javascript type, string - a typescript type
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
})

// mongoose middleware( .pre() to perform some operation before saving user data anytime) 
// mongoose does not have direct support for aysnc code so provide done parameter which need to called after all async await code 
userSchema.pre('save', async function(done){
  // this -> refers to the document that is about to be saved
  if(this.isModified('password'))
    {
      const hashedPass = await Password.toHash(this.get('password'))
      this.set('password',hashedPass)
    }
    done();
});

// statics -> mongoose statics are methods that are available on the model itself
// build -> a static method that will be available on the model itself
// this method will be used to create a new user document
userSchema.statics.build = (attr:UserAttr)=>{
  return new User(attr);
}



const User = mongoose.model<UserDoc,UserModel>('User',userSchema) // types here to assist typescript 

// Issue while using mongoDB along with typeScript 
// First issue -> mongoose abstract all the data type info from typescript 
// due to which while calling constructor typescript does not throw any error if wrong attribute name or type  
// second issue -> the object returned by the constructor may contain some extra attribute apart from the input attribute values


//const user = User.build({email:'test@test.com', password:'abhi@123'})


export {User};
