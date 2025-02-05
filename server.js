import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from "path";
import app from './public/js/app.js';
import connectDB from "./Api/server/db.js";

const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.static("./public"));
//Get File
app.get('/', (req,res) =>{
  res.sendFile(path.resolve("./public/popup.html"));
})
app.listen(PORT, () => {
  console.log(`Server is Live on PORT: ${PORT}....`);
});
