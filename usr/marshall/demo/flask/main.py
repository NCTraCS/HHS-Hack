from flask import Flask,jsonify
app = Flask(__name__)

import dbcalls

#route for hello world
@app.route("/")
def hello():
    return( 
    	"<p>Hello flask!</p>"\
    	"<a href='http://localhost:5000/gaz'>Try Gaz at localhost:5000/gaz</a><br />"\
    	"<a href='http://localhost:5000/gaz/37'>Try Gaz for NC at localhost:5000/gaz/37</a><br />"
    	)

#two route definitions going to one method
# # one route with param and one without
@app.route('/gaz', methods=['GET'])
@app.route('/gaz/<int:state_fips>', methods=['GET'])
def startup(state_fips=None):
    gazdat = dbcalls.gaz(state_fips)
    response = jsonify(gazdat);
    response.headers.add('Access-Control-Allow-Origin','*');
    return response
