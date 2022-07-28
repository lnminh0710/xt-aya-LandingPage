var Service = require('node-windows').Service;
var svc = new Service({
	name:'AyaVN',
	description:'AyaVN',
	script: 'C:\\inetpub\\wwwroot\\AyaVN\\AyaLandingPage\\server.js'
});
svc.on('install', function(){
	console.log('uninstall');
});

svc.uninstall();