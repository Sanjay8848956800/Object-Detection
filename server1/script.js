const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("views"));
app.set('view engine', 'ejs'); // Corrected view engine setup

const mongoDBURL = "mongodb://127.0.0.1:27017/deepFake"; // Adjust the database name if necessary

// Connect to MongoDB
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

// Define a Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // Example: Making email a required field
        unique: true,   // Example: Ensuring email is unique
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String, // Assuming mobile number can include characters like '+', '-' etc.
        required: true,
    },
    gender: {
        type: String,
        // required: true,
    },
    currentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    alternativeNumber: {
        type: String,
        required: true,
    },
    identificationMark: {
        type: String,
        required: true,
    },
    uploadCount:{
        type: Number,
        required: true,
        default: 0,
    },
    dateofbirth:{
        type:String,
        required:true,
        
    },
    mobileNetCount:{
        type: Number,
        required: true,
        default: 0,
    },
    cocoSsdCount:{
        type: Number,
        required: true,
        default: 0,
    }
});

// Define a Model
const User = mongoose.model('User', userSchema);

app.post("/login", async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    
    const userAvailable = await User.find({email:userEmail})

    console.log(userAvailable +'userAvailable')
    
    console.log(userAvailable)

    if(userAvailable.length>0){
       res.status(200).json({message:'exists',userDetails:userAvailable})

    }else{
        res.status(200).json({message:'not exists'})
    
    }

    // Assuming you have some users to compare against
  

    // Insert the user into the database

});
app.post("/SignUp", async (req, res) => {
    console.log("object")
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userName = req.body.name;
    const userMobile = req.body.mobileNumber;
    const userGender = req.body.gender; 
    const usercurrentAddress = req.body.currentAddress;
    const userbloodGroup = req.body.bloodGroup;
    const useralternativeNumber = req.body.alternativeNumber;
    const useridentificationMark = req.body.identificationMark;
    const userpincode = req.body.pincode;
    const userpermanentAddress = req.body.permanentAddress;
    const userCount = req.body.uploadCount;
    const userdateofbirth = req.body.dateofbirth;


    const userAvailable = await User.find({email:userEmail})
    
    console.log(req.body)

    if(userAvailable.length>0){
       res.status(200).json({message:'exists'})
    }else{
        try {
            const result = await User.insertMany([
                { email: userEmail, password: userPassword,name:userName,mobileNumber:userMobile,gender:userGender,currentAddress:usercurrentAddress,bloodGroup:userbloodGroup,alternativeNumber:useralternativeNumber,identificationMark:useridentificationMark,pincode:userpincode,permanentAddress:userpermanentAddress,uploadCount:userCount,dateofbirth:userdateofbirth }
            ]);
            console.log('User saved:', result);

            res.status(200).json({message:'created'})


        } catch (err) {
            console.error(err);
        } finally {
            mongoose.connection.close();
        }
    }

    // Assuming you have some users to compare against
  

    // Insert the user into the database

});
app.post('/uploadCount', async (req, res) => {
    const { uploadCount, email } = req.body;
    console.log(email)

    try {
        const user = await User.findOne({ email });
        if (user) {
            user.uploadCount += uploadCount; // Increment the count
            console.log(uploadCount)
            await user.save();
            res.status(200).json({ message: 'Upload count updated successfully' });
        } else {
            res.status(500).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating upload count:', error);
        res.status(500).json({ message: 'Error updating upload count' });
    }
});
app.post('/updateModelCount', async (req, res) => {
     const { email,type } = req.body;
     console.log("classy")
    try {
        const user = await User.findOne({ email });
        if (user) {
            if(type==='cocossd'){

                user.cocoSsdCount += 1;
            }if(type==='mobileNet'){
                user.mobileNetCount += 1; // Increment the MobileNet count
            }
            await user.save();
            res.status(200).json({ message: 'MobileNet count updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating MobileNet count', error: error.message });
    }
});

// Update Coco-SSD Count Route


app.get('/getUser',async(req,res)=>{
    try {
        const user = await User.find({})
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
