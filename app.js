const http = require('http');

function handler(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from CI/CD pipeline!');
}

if (require.main === module) {
  http.createServer(handler).listen(3000, () => console.log('Running on port 3000'));
}

module.exports = { handler };