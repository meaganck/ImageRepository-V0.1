var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const { Console } = require('console');
var path = require('path');
const { rawListeners } = require('process');



http.createServer(function (req, res) {
   // parses file and adds file to server
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      // change this to path file is in

        //check if the file is valid (JPG or PNG)
        if ((path.extname(files.filetoupload.name).toUpperCase() == '.PNG') ||(path.extname(files.filetoupload.name).toUpperCase() == '.JPG')){
            
            var newpath = 'C:/Users/Chris/hello/' + files.filetoupload.name; //CHANGE TO YOUR DIRECTORY ********************************************************************************************
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });

            res.writeHead(200, {'Content-Type': 'text/html'});
            stylePage(res); // add CSS 
            res.write('<html><body>');

            makeForm(res);
            showImages(res);
            res.end('</div></body></html>');

        }else{
            console.log("Not a valid file: "+ path.extname(files.filetoupload.name));
        }
        
    })
  } else {
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    stylePage(res);
    makeForm(res);
    showImages(res);
    res.end('</div></body></html>');
    //return;
  }
}).listen(8080);

var makeForm = function(res){
       // produces HTML form to upload file
       res.write('<div class="container-fluid"> <h1 class="text-center">Image Repository</h1>');
       res.write('<p class="text-center">Welcome to the Image Repository! This repository works by displaying all the images located in \
                in its directory. Feel free to add your own pictures by selecting <i>Choose File</i> and upload a <b>JPG or PNG</b>\
                file.</p> ');
       res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
       res.write('<input type="file" name="filetoupload"><br><br>');
       res.write('<input type="submit">');
       res.write('</form>');
}

var showImages = function(res) {
  // shows all the images in the directory

  let row = 1;
  res.write('<div class="container-fluid">');
  res.write('<div class="row">');

  var files = fs.readdirSync("C:/Users/Chris/hello/") ; //CHANGE TO YOUR DIRECTORY ********************************************************************************************
    files.forEach( function (file) {
       
      if ((path.extname(file).toUpperCase() == '.PNG') ||(path.extname(file).toUpperCase() == '.JPG')){   
        if(row >3){
          res.write('</div><div class="row">'); // end previous row tag and add new row
          row = 0; // reset
        }
        res.write('<div class="col-md-4">')
        var data = fs.readFileSync(file);
        // add image tag
        res.write('<img src="data:image/jpeg;base64,');
        res.write(Buffer.from(data).toString('base64'));
        res.write('" class="center-block" style="width:65%"/>');
        res.write('</div>'); // end col tag
        row += 1; 
      }
    });

    res.write('</div>') // end tag for container-fluid
}

var stylePage = function(res){
  var data = fs.readFileSync('index.html');
  res.write(data);
}