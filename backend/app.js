const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const expressMongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");
const compression = require("compression");

const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
const GlobaleErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

app.use(cors());

app.use(helmet());
app.use(cookieParser());

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(expressMongoSanitize());

// Data sanitization against XSS
const { window } = new JSDOM("");
const DOMPurify = createDOMPurify(window);

app.use((req, res, next) => {
  // Sanitize request body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = DOMPurify.sanitize(req.body[key]);
    });
  }

  // Sanitize request query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      req.query[key] = DOMPurify.sanitize(req.query[key]);
    });
  }
  next();
});
app.use(hpp());
app.use(compression());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

app.all("*", (req, res, next) => {
  next(new AppError("This route could not be found on this server", 404));
});

app.use(GlobaleErrorHandler);

module.exports = app;
