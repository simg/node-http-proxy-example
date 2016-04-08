var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer(),
    fs = require('fs');


var configFile = './config.js';
var config = require(configFile);

//console.log(Object.keys(require.cache))
fs.watch(configFile, function() {
  //ensure require cache is cleared then reload the config file
  delete require.cache[require.resolve(configFile)];
  config = require(configFile);
  console.log("reloaded configuration file")
})

//create proxy server
http.createServer(function(req, res) {
  var host = config.routes[req.headers.host]; //get domain configuration
  var target = host.target; //default target for this domain
  if (host.paths) {
    for (p in host.paths) {
      if (req.url.indexOf('/modules') == -1 && req.url.indexOf('/sites') == -1 && req.url.indexOf('misc') == -1) {
        var log = true
      } else {
        log = false;
      }
      if (req.url.indexOf(p) == 0) {
        //request path matches a configured route
        target = host.paths[p].target;
        break;
      }
    }
  }
  if (log) {
    console.log("target="+target)
  }
  proxy.web(req, res, {
    target: target
  });
}).listen(config.port);




//switch to low priviledge user after binding to port
if (config.setgid) process.setgid(config.setgid);
if (config.setuid) process.setuid(config.setuid);
