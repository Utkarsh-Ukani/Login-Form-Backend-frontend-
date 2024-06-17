import dotenv from "dotenv"
import connectDB from "./config/db.js"
import app from "./app.js";
dotenv.config()

const PORT = process.env.PORT
connectDB()
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`server at running at http://localhost:${PORT}`);
  })
}
);











// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import cors
// const app = express();

// app.use(cors()); // Enable cors middleware

// app.use(bodyParser.json());

// app.post('/api/signup', (req, res) => {
//   const formData = req.body;
//   console.log('Received form data:', formData);

//   res.status(200).json({ message: 'Signup successful!' });
// });

// // ... (other routes)

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
