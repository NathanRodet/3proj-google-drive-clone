require('dotenv/config');
const port = process.env.PORT || 3001;
const baseURL = process.env.BASEURL || "http://localhost:" + port + "/"

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