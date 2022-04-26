require('dotenv/config');
const port = process.env.PORT || 3001;
var baseURL;

if (port === 3001) {
  baseURL = "http://localhost:" + port + "/"
} else {
  baseURL = process.env.BASEURL
}

const options = {
  definition: {
    swagger: "2.0",
    servers: [
      {
        url: baseURL,
      },
    ],
  },
  apis: ["./swagger/docs.yml"],
};

module.exports = { options }