const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/auth');


const app = express();
const PORT = process.env.PORT || 8080; 

const allowedOrigins = ["http://localhost:8080", "https://zonefolio.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server or curl requests
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // <— important
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);

app.listen(PORT, "0.0.0.0" ,  () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});