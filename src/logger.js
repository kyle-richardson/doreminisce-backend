function logger(req, res, next) {
    console.log(
      `\n[${new Date().toISOString()}] ${req.method} to ${
        req.url
      } from \norigin: ${req.get("origin")}`
    );
  
    next();
  }
  
  module.exports = logger;
  