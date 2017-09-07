/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var obj = {
  results: [],
};



var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;

  // See the note below about CORS headers.
  

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // if (request.url !== '/classes/messages') {
   
  //   response.writeHead(404, headers);
  //   response.end();
  // }

  // if (request.method === 'GET') {
    
   
    
  // }
  if (!request.url.includes('/classes/messages')) {
    statusCode = 404;
  }
  if (request.method === 'POST') {
    //console.log(request, 'testing');
    request.on('data', (chunk) => {
      obj.results.push(JSON.parse(chunk));
    });

    statusCode = 201;
    // response.end(JSON.stringify(obj));
  }
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';

  response.writeHead(statusCode, headers);
  
  response.end(JSON.stringify(obj));
};




exports.requestHandler = requestHandler;
//exports.defaultCorsHeaders = defaultCorsHeaders;