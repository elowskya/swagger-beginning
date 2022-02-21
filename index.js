const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//data parser - used to parse post data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//routes
app.get("/", (req, res) => {
  res.send("hello world");
});

//YAML for swagger documentation
/**
 * @swagger
 * /books:
 *  get:
 *      description: Get all books
 *      responses:
 *          200:
 *              description: Success
 */

app.get("/books", (req, res) => {
  res.send([
    {
      isbn: "48739234",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publisher: "Scholastic",
    },
  ]);
});

/**
 * @swagger
 * /book:
 *      post:
 *          description: Get one book use syntax wrapped in curly braces and quotation separated by colon title name of book
 *          parameters:
 *          - name: title
 *            description: Book title
 *            in: body
 *            required: true
 *            type: string
 *          responses:
 *              200:
 *                  description: Success
 *
 */

app.post("/book", (req, res) => {
  const title = req.body.title;
  res.send({ title });
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
