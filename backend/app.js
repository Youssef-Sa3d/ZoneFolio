const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = process.env.PORT || 8080; 

app.use(cors({
  origin: '*', // frontend origin
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);

app.listen(PORT, "0.0.0.0" ,  () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});