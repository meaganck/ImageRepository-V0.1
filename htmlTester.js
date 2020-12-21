var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
   // parses file and adds file to server
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      // change this to path file is in

        //check if its valid
        //if (path.extname(req.file.originalname).toLowerCase() === "jpg") {
        var newpath = 'C:/Users/YOURNAME/hello/' + 'image.jpg';
        fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!\n' + "Now check the website!");
        res.end();
        });
        

        // open website
        /*
      fs.readFile('index.html', function(err, data) {
        if (err) throw err // Fail if the file can't be read.
        http.createServer(function(req, res) {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.end(data) // Send the file data to the browser.
        }).listen(8124)
        console.log('Server running at http://localhost:8124/')
        });
        */
    })
  } else {
       // produces HTML form to upload file
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);

