from flask import Flask,jsonify
app = Flask(__name__)

import dbgaz
import dbOpRxRate

#route for hello world
@app.route("/")
def hello():
    return( 
    	"<p>Hello flask!</p>"\
    	"<a href='http://localhost:5000/gaz'>Try Gaz at localhost:5000/gaz</a><br />"\
    	"<a href='http://localhost:5000/gaz/37'>Try Gaz for NC at localhost:5000/gaz/37</a><br />"
    	"<a href='http://localhost:5000/op_rx_rate_decile/37'>Try opioid rx_rate for NC at localhost:5000/op_rx_rate_decile/37</a><br />"
    	)

#two route definitions going to one method
# # one route with param and one without
@app.route('/gaz', methods=['GET'])
@app.route('/gaz/<int:state_fips>', methods=['GET'])
def gazRoute(state_fips=None):
	res = dbgaz.gaz(state_fips)
	response = jsonify(res)
	response.headers.add('Access-Control-Allow-Origin','*')
	return response

@app.route('/op_rx_rate_decile', methods=['GET'])
@app.route('/op_rx_rate_decile/<int:state_fips>', methods=['GET'])
def opRxRate(state_fips=None):
	res = dbOpRxRate.rateTile(state_fips,10)
	response = jsonify(res)
	response.headers.add('Access-Control-Allow-Origin','*')
	return response
