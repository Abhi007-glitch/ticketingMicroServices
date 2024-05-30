import mongoose from "mongoose";
import { Password } from "../utility/hashing";

//*************************************** MULTIPLE New CONCEPTS *****************************************************

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

//****************************** all above code were responsible to make typescript understand MongoDB model and document 

const userSchema = new mongoose.Schema({
  email:{
    // types of property mentioned over here are linked to mongo not typescript
    type:String,   // String- a Mongoos type, string - a typescript type
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
},
{  
  // THIS is very rarely used method ( generally we have view(DTO) component in MVC )
  // (**************************(((( Method by which the returned JSON objects structure can be customized in the require data formate ))))
  // in plain javascript how object is converted to JSON ( while ) => we make a call to JSON.stringify() [ this method internally calls toJSON() method which inbuilt property added to any ]
  // toJSON -> mongoose middleware that will be called whenever we convert document to JSON
  toJSON :{  
    transform(doc,ret)  {  // look into toJSON internal code by right clicking it for more understanding (this transform method is called by mongoDB to convert a mongo document to a JSON object.)
      // doc -> actual document , ret -> object which will be returned as JSON formate output (this is set to actual doc, so we just update ret object to remove or add properties)
        ret.id=ret._id;
        delete ret._id;
        delete ret.password;  // delet is plain Javascript stuff ....
        delete ret.__v;
    }
  }
}

)

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
