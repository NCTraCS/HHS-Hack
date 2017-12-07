from flask import Flask,jsonify,request
app = Flask(__name__)

import dbconnect
import dbcalls
import coOccur

#route for hello world
@app.route("/")
def hello():
    return( 
    	"<p>Hello flask!</p>"\
    	"<a href='http://localhost:5000/gaz'>Try Gaz at localhost:5000/gaz</a><br />"\
    	"<a href='http://localhost:5000/gaz/37'>Try Gaz for NC at localhost:5000/gaz/37</a><br />"
    	"<a href='http://localhost:5000/co_occur_list'>Try co_occur_list</a><br />"
    	)

#two route definitions going to one method
# # one route with param and one without
@app.route('/gaz', methods=['GET'])
@app.route('/gaz/<int:state_fips>', methods=['GET'])

def cnty(state_fips=None):
    gazdat = dbcalls.gaz(state_fips)
    response = jsonify(gazdat);
    response.headers.add('Access-Control-Allow-Origin','*');
    return response

@app.route('/st', methods=['GET'])
@app.route('/st/<int:state>', methods=['GET'])

def states(state=None):
    stdat = dbcalls.st(state);
    response = jsonify(stdat);
    response.headers.add('Access-Control-Allow-Origin','*');
    return response

@app.route('/cdc/rates', methods=['GET'])
@app.route('/cdc/rates/<int:state>', methods=['GET'])
@app.route('/cdc/rates/<int:state>/<int:county>', methods=['GET'])

def cdc_rates(state=None, county=None):
    cntydat = dbcalls.cdc_rates(state, county);
    response = jsonify(cntydat);
    response.headers.add('Access-Control-Allow-Origin','*');
    return response

@app.route('/co_occur_list', methods=['GET'])
def coOccurList(state_fips=None):
	op_dx_limit = request.args.get('op_dx_limit')
	co_dx_limit = request.args.get('co_dx_limit')
	result = coOccur.coDxList(op_dx_limit,co_dx_limit)
	response = jsonify(result)
	response.headers.add('Access-Control-Allow-Origin','*')
	return response
