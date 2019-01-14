var http = require('http');
var url = require('url');
var fileSystem = require('fs');


http.createServer(function (request, response) {
    
    var pathName = url.parse(request.url).pathname;
    var fileName = pathName.substr(1); /* lets remove the "/" from the name */

    console.log(request.url)
    console.log(".")

    if(fileName == "todo")
    {
        console.log("Filename is : " + fileName)
        fileName ="todo.json"
    }
    else if(fileName == "read-todo")
    {
        fileName = "read-todo.html"
    }
    if(fileName == "todo.json")
    {
        console.log("Filename is : " + fileName)
    }
    if(fileName == "read-todo.html")
    {
        console.log("Filename is : " + fileName)
    }

    //This changes the content type based on the fileName
    var contentType = "text/html"
    if(fileName == "todo.json")
    {
        contentType = "application/json"
    }

    fileSystem.readFile(fileName , callback);

    function callback(err, data) {
        if (err) {
            console.error(err);
            response.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' });
            console.log("Bad fileName was: " + fileName)
        }
        else {
            response.writeHead(200, {'Content-Type': contentType})
            response.write(data.toString())
        }
        
        /* the response is complete */
        response.end();
    }
   
}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/index.html');
