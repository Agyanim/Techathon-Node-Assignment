const { writeFile } = require("fs").promises;

exports.writeToFile = async (filePath, file, res) => {
  try {
    writeFile(filePath, file, "utf-8");
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ message: "Sorry, internal server error occurred" })
    );
  }
};
