const http = require('http');
const fs = require('fs');
const publicIp = require('public-ip');
const fileUrl = new URL('file:///Z:/home/trydee/web/content.html');
var content;
var request;
var myip;
var oldIP;

getIP();


async function getIP(){
	//console.log(await publicIp.v4());
	myip = await publicIp.v4();
	console.log(myip);
	readIPfile();
};



//var re= setInterval(function f(){getIP()}, 10000);

function  readIPfile(){
	fs.readFile('web/location.txt', 'utf8',  (err, data) => {
	  if (err) throw err;
	  oldIP =data;
	  console.log(oldIP);
	  if (myip != oldIP){
		 fs.writeFile('web/location.txt', myip, 'utf8',  (err) => { 
			  if (err) throw err;
		 });
	  }
	  
	 fs.close(1,( err) => {
		if (err) throw err;
	  });
	});

	fs.readFile('web/content.html', 'utf8',  (err, data) => {
	  if (err) throw err;
	  content =data;
	  
	 fs.close(2, ( err) => {
		if (err) throw err;
	  });
	});
}


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	 
  console.log(ip);
  res.end(content);
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');

