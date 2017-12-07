		// test data
		const data = [
		  {decile: 1, rxrate: .3},
		  {decile: 2, rxrate: 2},
		  {decile: 3, rxrate: 5, label:"My\nRisk", fill: "red"},
		  {decile: 4, rxrate: 9},
		  {decile: 5, rxrate: 10},
		  {decile: 6, rxrate: 14},
		  {decile: 7, rxrate: 19},
		  {decile: 8, rxrate: 22},
		  {decile: 9, rxrate: 29},
		  {decile: 10, rxrate: 37}
		];
		var Request = require('request');
		Request.get('http:\/\/localhost:5000/op_rx_rate_decile', (error, response, body) => {
		    if(error) {
		        return console.log("WHAT ERROR?");
		    }
    		const counties = JSON.parse(body);
    		console.log(counties)
		});

console.log(data);