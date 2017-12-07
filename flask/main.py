from flask import Flask,jsonify,request
app = Flask(__name__)

import dbconnect
import dbcalls
import coOccur
import countyVector
import edEmp

#route for hello world
@app.route("/")
def hello():
    return( 
    	"<p>Hello flask!</p>"\
    	"<a href='http://localhost:8080/gaz'>Try Gaz at localhost:8080/gaz</a><br />"\
    	"<a href='http://localhost:8080/gaz/37'>Try Gaz for NC at localhost:8080/gaz/37</a><br />"
    	"<a href='http://localhost:8080/co_occur_list'>Try co_occur_list</a><br />"
        "<a href='http://localhost:8080/death_per_cap?id_county=orange'>Try death_per_cap</a><br />"
        "<a href='http://localhost:8080/op_disch_per_cap?id_county=erie'>Try op_disch_per_cap</a><br />"
        "<a href='http://localhost:8080/education?id_ed_level=13_to_15'>Try education</a><br />"
        "<a href='http://localhost:8080/employment?id_emp_status=unemployed'>Try employment</a><br />"
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

@app.route('/death_per_cap', methods=['GET'])
def deathPerCap():
    id_county = request.args.get('id_county')
    result = countyVector.deathPerCap(id_county)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/op_disch_per_cap', methods=['GET'])
def opDischPerCap():
    id_county = request.args.get('id_county')
    result = countyVector.opDischPerCap(id_county)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/education', methods=['GET'])
def education():
    id_ed_level = request.args.get('id_ed_level')
    result = edEmp.education(id_ed_level)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/employment', methods=['GET'])
def employment():
    id_emp_status = request.args.get('id_emp_status')
    result = edEmp.employment(id_emp_status)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

    
