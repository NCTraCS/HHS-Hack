from flask import Flask,jsonify
app = Flask(__name__)

import dbcalls

#route for hello world
@app.route("/")
def hello():
    return "Hello World!"

#two route definitions going to one method
# # one route with param and one without
@app.route('/gaz', methods=['GET'])
@app.route('/gaz/<int:state_fips>', methods=['GET'])
def startup(state_fips=None):
    gazdat = dbcalls.gaz(state_fips)
    return jsonify( gazdat )
