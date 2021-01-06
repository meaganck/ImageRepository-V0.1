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
        if ((path.extname(files.filetoupload.name).toUpperCase() == '.PNG') || (path.extname(files.filetoupload.name).toUpperCase() == '.JPG')){
            
            var newpath = 'C:/Users/Chris/hello/' + files.filetoupload.name; //CHANGE TO YOUR DIRECTORY ********************************************************************************************
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
            
            // writes HTML
            res.writeHead(200, {'Content-Type': 'text/html'});
            stylePage(res); // add CSS 
            makeForm(res);
            showImages(res);
            res.end('</div></body></html>');

        }else{
            console.log("Not a valid file: "+ path.extname(files.filetoupload.name)); // invalid file uploaded
        }
        
    })
  } else {
    // default: display introduction, form and images in directory
    res.writeHead(200, {'Content-Type': 'text/html'});
    stylePage(res);
    makeForm(res);
    showImages(res);
    res.end('</div></body></html>');
  }
}).listen(8080);

var makeForm = function(res){
       // produces HTML form to upload file and introduction to page
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
  // shows all the images in the directory using a 3 column grid

  let col = 1;
  res.write('<div class="container-fluid">');
  res.write('<div class="row">');

  var files = fs.readdirSync("C:/Users/Chris/hello/") ; //CHANGE TO YOUR DIRECTORY ********************************************************************************************
    files.forEach( function (file) {
       
      // check if the file is an image
      if ((path.extname(file).toUpperCase() == '.PNG') || (path.extname(file).toUpperCase() == '.JPG')){   
        // if past the 3rd column, then make a new row
        if(col > 3){
          res.write('</div><div class="row">'); // end previous row tag and add new row
          col = 1; // reset
        }
        res.write('<div class="col-sm-4">'); // create new column
        var data = fs.readFileSync(file); // get data of image

        // add image to page
        res.write('<img src="data:image/jpeg;base64,');
        res.write(Buffer.from(data).toString('base64'));
        res.write('" class="center-block" style="width:65%"/>');
        res.write('</div>'); // end col tag
        col += 1; 
      }
    });
    res.write('</div>') // end tag for container-fluid
}

var stylePage = function(res){
  // adds styling to page from index.html
  var data = fs.readFileSync('index.html');
  res.write(data);
}