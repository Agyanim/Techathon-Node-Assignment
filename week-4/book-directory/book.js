const { readFile } = require("fs").promises;
const { readFileSync, writeFileSync } = require("fs");
const { writeToFile } = require("./util");

exports.createBook = async (req, res) => {
  try {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      data = JSON.parse(data);
      if (!data.title || !data.author) {
        console.log(data);
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "All field must be provided" })
        );
      }
      const book = {
        bookId: new Date().getMilliseconds(),
        title: data.title,
        author: data.author,
        createdON: new Date().toLocaleString(),
        modifiedOn: new Date().toLocaleString(),
      };
      console.log(typeof book.bookId);
      let fileData = await readFileSync("./book.json", "utf-8");

      fileData = JSON.parse(fileData);
      fileData.push(book);
      await writeFileSync("./book.json", JSON.stringify(fileData));
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Success", Book: book }));
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ Error: error.message }));
  }
};
exports.getAllBooks = async (res) => {
  try {
    let fileData = await readFileSync("./book.json", "utf-8");
    fileData = JSON.parse(fileData);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Success", BookS: fileData }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ Error: error.message }));
  }
};

exports.getBookById = async (res, id) => {
  try {
    let fileData = await readFileSync("./book.json", "utf-8");
    fileData = JSON.parse(fileData);
    const findBook = fileData.find((book) => book.bookId === +id);
    if (!findBook) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "No record found" }));
    }
    console.log(findBook);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Success", Book: findBook }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ Error: error.message }));
  }
};
exports.deleteBook = async (res, id) => {
  try {
    let fileData = await readFileSync("./book.json", "utf-8");
    fileData = JSON.parse(fileData);
    // console.log(typeof(id));
    const findBook = fileData.find((book) => book.bookId === +id);
    if (!findBook) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "sorry, the record does not exit" })
      );
    }
    console.log(findBook);

    const filteredBooks = fileData.filter((book) => book.bookId !== +id);
    console.log(filteredBooks);

    await writeFileSync("./book.json", JSON.stringify(filteredBooks));
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ message: "Success", Books: filteredBooks })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ Error: error.message }));
  }
};

exports.updateBook = async (req, res, id) => {
  try {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", async () => {
      data = JSON.parse(data);
      const { title, author } = data;
      let fileData = await readFileSync("./book.json", "utf-8");
      fileData = JSON.parse(fileData);
      // console.log(typeof(id));
      const findBook = fileData.find((book) => book.bookId === +id);

      if (!findBook) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "sorry, the record does not exit" })
        );
      }
      title !=undefined? findBook.title=title :findBook.title=findBook.title
      author !=undefined? findBook.author=author :findBook.author=findBook.author
console.log(findBook);
      let filteredBooks = fileData.filter((book) => book.bookId !== +id);

      filteredBooks.push(findBook)
    //   await writeFileSync("./book.json", JSON.stringify(filteredBooks));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Success", Book: findBook })
      );
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ Error: error.message }));
  }
};
