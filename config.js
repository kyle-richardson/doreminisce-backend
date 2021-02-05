require("dotenv").config();

module.exports = {
  clientId: process.env.CLIENT_ID,
  redirectURI: process.env.REDIRECT_URI || 'http://localhost:5500/callback',
  clientSecret: process.env.CLIENT_SECRET,
  frontEnd: process.env.FRONT_END || 'http://localhost:3000'
}
