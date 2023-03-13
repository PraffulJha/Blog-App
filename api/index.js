import express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";
import multer from "multer";
const app = express()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
   res.status(200).json(file.filename)
  })
app.use(express.json())
app.use(cookieParser())


app.use("api/auth",authRoutes)
app.use("api/users",usersRoutes)
app.use("api/posts",postRoutes)
app.listen(8800, ()=>{
    console.log("Connected !");
})