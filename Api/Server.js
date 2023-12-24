import express from "express";
import postroute from "./Routes/post.js";
import userroute from "./Routes/user.js";
import authroute from "./Routes/auth.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: ["http://localhost:5173/"],
  methods: ["GET", "POST", "DELETE", "PUT"],
};
app.use(cors({ corsOption }));

app.use("/post", postroute);
app.use("/user", userroute);
app.use("/auth", authroute);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), function (req, res) {
 
  const file = req.file;
  console.log(file)
  // res.status(200).json(file.filename);
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, ".imgupload/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   console.log(req.body);
  
//   console.log(req.file);
// });
app.post("/uploadpost", (req, res) => {
  console.log(req.body);
  res.send("successful");
});

app.listen(port, (res) => {
  console.log("Running");
});
