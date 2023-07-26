const { createServer } = require("http");
const url = require("url");
const {
  createBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
} = require("./book");

const server = createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const method = req.method;
  const id = parsedUrl.query.bookId;

  // outter switch statement
  switch (method) {
    // outter switch case
    case "POST":
      switch (pathName) {
        case "/book":
          createBook(req, res);
          break;

        default:
          break;
      }
      break;
    // outter switch case
    case "GET":
      switch (pathName) {
        case "/book":
          getAllBooks(res);
          break;
        case "/book/id":
          getBookById(res, id);
          break;
        default:
          break;
      }
    // outter switch case
    case "PUT":
      switch (pathName) {
        case "/book/id":
          updateBook(req, res, id);
          break;

        default:
          break;
      }
    // outter switch case
    case "DELETE":
      switch (pathName) {
        case "/book/id":
          deleteBook(res, id);
          break;

        default:
          break;
      }
    default:
      break;
  }
});

server.listen(3000, () => {
  console.log("Server started and running on port 3000...");
});
