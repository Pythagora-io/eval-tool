// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const authRoutes = require("./routes/authRoutes");
const testRoutes = require('./routes/testRoutes'); // Added testRoutes require
const Test = require('./models/testModel'); // Import Test model

// Function to check if required environment variables are set
function checkRequiredConfigurations() {
  const requiredConfigs = [
    'OPENAI_API_KEY', 'OPENAI_MODELS',
    'ANTHROPIC_API_KEY', 'ANTHROPIC_MODELS',
    'GROQ_API_KEY', 'GROQ_MODELS'
  ];
  const missingConfigs = requiredConfigs.filter(config => !process.env[config]);
  if (missingConfigs.length > 0) {
    console.error("Missing required configurations: " + missingConfigs.join(", "));
    process.exit(-1);
  }
}

// Call the check function before attempting to connect to the database or starting the server
checkRequiredConfigurations();

if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
  console.error("Error: config environment variables not set. Please create/edit .env configuration file.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting the templating engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  });

// Session configuration with connect-mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  }),
);

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Logging session creation and destruction
app.use((req, res, next) => {
  const sess = req.session;
  // Make session available to all views
  res.locals.session = sess;
  if (!sess.views) {
    sess.views = 1;
    console.log("Session created at: ", new Date().toISOString());
  } else {
    sess.views++;
    console.log(
      `Session accessed again at: ${new Date().toISOString()}, Views: ${sess.views}, User ID: ${sess.userId || '(unauthenticated)'}`,
    );
  }
  next();
});

// Authentication Routes
app.use(authRoutes);

// Test Routes - Added testRoutes to the middleware stack
app.use(testRoutes);

// Root path response
app.get("/", async (req, res) => {
  try {
    const tests = await Test.find({}).lean();
    tests.forEach(test => {
      test.resultCount = test.scenarios.reduce((acc, scenario) => acc + scenario.results.length, 0);
    });
    res.render("index", { tests });
  } catch (error) {
    console.error(`Failed to fetch tests: ${error.message}`);
    console.error(error.stack);
    res.status(500).send("Error fetching tests.");
  }
});

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
