const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/authentication");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const cors = require("cors");

const corsOptions ={
    origin:'https://sammernblog.herokuapp.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
dotenv.config({path: "./.env"});
app.use(express.json());     //to send json api in body from postman test
app.use("/images", express.static(path.join(__dirname,"/images")))


// mongoose.connect(process.env.MONGO_URL).then(console.log("connected to mongo")).catch(err=>console.log(err));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to mongo")).catch(err=>console.log(err)); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images")
    },filename:(req,file,cb) => {
        cb(null, req.body.name)   
    }
});
        
const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded...")
});

app.use("/api/authentication",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/post",postRoute);
app.use("/api/categories",categoriesRoute);


app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


app.listen(PORT, ()=>{
    console.log(`backend is running${PORT}`);
});