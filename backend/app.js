const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/auth');
const templateRoutes = require('./src/routes/template');
const adminRoutes = require('./src/routes/admin');
const portfolioRoutes = require("./src/routes/portfolio");




const app = express();
const PORT = process.env.PORT || 8080; 


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      // Allow localhost for dev
      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      // Allow main app
      if (origin === "https://zonefolio.vercel.app") {
        return callback(null, true);
      }

      // Allow dynamic subdomains *.vercel.app
      if (/https:\/\/[a-z0-9-]+-zonefolio\.vercel\.app/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/templates", templateRoutes);
app.use("/admin", adminRoutes);
app.use("/portfolio", portfolioRoutes);

app.listen(PORT, "0.0.0.0" ,  () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});