var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const { Console } = require('console');
var path = require('path')



http.createServer(function (req, res) {
   // parses file and adds file to server
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      // change this to path file is in

        //check if its valid
        if ((path.extname(files.filetoupload.name) == '.jpg') ||(path.extname(files.filetoupload.name) == '.JPG')){
            
            var newpath = 'C:/Users/Chris/hello/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
            path.join(newpath, 'pubic');

            res.writeHead(200, {'Content-Type': 'text/html'});
            //res.write('<html><body>');
            makeForm(res);
            showImages(res);
           
         
            fs.readFile('content.txt', function(err, data){
              if (err) throw err;
              res.write(data);
              res.end();
            });
          
        

        }else{
            console.log("Not a valid file: "+ path.extname(files.filetoupload.name));
        }
        
    })
  } else {
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    makeForm(res);
    //showImages(res);
    res.end();
    //return;
  }
}).listen(8080);

var makeForm = function(res){
       // produces HTML form to upload file

       res.write('<h1>Image Repository</h1>');
       res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
       res.write('<input type="file" name="filetoupload"><br><br>');
       res.write('<input type="submit">');
       res.write('</form>');
}
/*
var showImages = function(res) {
    fs.readdir("C:/Users/Chris/hello/",function(err, files) {
        if (err) {
           return console.error(err);
        }
        files.forEach( function (file) {
           console.log( file );
           if ((path.extname(file) == '.jpg') ||(path.extname(file) == '.JPG')){
           fs.readFile(file, function(err, data) {
                if (err) throw err; // Fail if the file can't be read.
                res.write('<img src="data:image/jpeg;base64,');
                res.write(Buffer.from(data).toString('base64'));
                res.end('" style="width:50%"/>');
                //res.end('" style="width:50%"/></body></html>');
            });
        }
        });
     });

}
*/
var showImages = function(res) {
  fs.readdir("C:/Users/Chris/hello/",function(err, files) {
      if (err) {
         return console.error(err);
      }
      files.forEach( function (file) {
         
         if ((path.extname(file) === '.jpg') ||(path.extname(file) === '.JPG')){
          if (err) {
            return console.error(err);
         }
         console.log( file );  
        // fs.readFile(file, function(err, data) {
              if (err) throw err; // Fail if the file can't be read.
              //let text = '<img src="data:image/jpeg;base64,' + Buffer.from(data).toString('base64') + '" style="width:50%"/>';
              let text = '<img src="' + file+ '" style="width:50%"/>';
              fs.appendFile('content.txt', text, function (err){
                if(err) throw err;
                console.log("Added text: ");
              });
              //res.write('<img src="data:image/jpeg;base64,');
              //res.write(Buffer.from(data).toString('base64'));
             //res.write('" style="width:50%"/>');
              //res.end('" style="width:50%"/></body></html>');
             // res.end();
        // });
      }
    });

      //res.end('</body></html>');
   });
  
}
