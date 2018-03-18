const  server = require('http').createServer();

server.on('request', (req,res) =>{
    res.writeHead(200, {'content-type': 'text.plain'});
    res.write('Hello world\n');
    setTimeout(function () {
        res.write('Lala \n');
    },1300);

})
server.timeout = 1000;
server.listen(8000);