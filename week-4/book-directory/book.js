const { readFile } = require("fs").promises;
const { readFileSync } = require("fs");
const { writeToFile } = require("./util");

exports.createBook =async (req, res) => {
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
            return res.end(JSON.stringify({ message: "All field must be provided" }));
          }
          const book = {
            bookId: new Date().getMilliseconds(),
            title: data.title,
            author: data.author,
            createdON: new Date().toLocaleString(),
            modifiedOn: new Date().toLocaleString(),
          };
      
        let fileData= await readFileSync("./book.json", "utf-8");
            
            fileData = JSON.parse(fileData);
            fileData.push(book);
           await writeToFile("./book.json", JSON.stringify(fileData), res);
            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Success", Book: book }));
          });
           
    } 
    catch (error) {
        
    }

}
exports.getAllBooks=(res)=>{
    readFile("./book.json", "utf-8", (err, fileData) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Sorry, internal server error occurred" })
          );
        }
        fileData = JSON.parse(fileData);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Success", BookS: fileData }));
      });
  
}

exports.getBookById=(res,id)=>{
    readFile("./book.json", "utf-8", (err, fileData) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Sorry, internal server error occurred" })
          );
        }
        fileData = JSON.parse(fileData);
        const findBook=fileData.find(book=> book.bookId === +id)
        if (!findBook){
            res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "No record found" })
          );
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Success", Book: findBook }));
      });
  
}
exports.deleteBook=(res,id)=>{
    readFile("./book.json", "utf-8", (err, fileData) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Sorry, internal server error occurred" })
          );
        }
        fileData = JSON.parse(fileData);
        const findBook=fileData.find(book=> book.bookId === +id)
        if (!findBook){
            res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "sorry, the record does not exit" })
          );
        }
        else{

            const filteredBooks= fileData.filter(book=> book.bookId !==+ id)
            writeToFile("./book.json",filteredBooks,res)
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Success", Books: filteredBooks }));
        }
      });
  
}