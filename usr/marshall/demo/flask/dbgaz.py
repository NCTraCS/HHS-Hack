#!/usr/bin/python3
import sys
import pymysql
import dbconnect

#get data from gaz_county table
#return as json
def gaz(state_fips=None):
	conn = dbconnect.connect()
	sql = "select * from gaz_county"
	if state_fips != None:
		sql += " where state_fips=%s"

	cursor = conn.cursor()
	cursor.execute(sql,(state_fips))
	result = cursor.fetchall()
	return result

def test():
	print("TESTING dbgaz")
	counties = gaz()
	print("Counties for state 37 (NC)")
	for county in counties:
		print("name: {}	fips: {}	population: {:d}".format(county['name'], county['geoid'], county['pop2010']))


if len(sys.argv) > 1 and sys.argv[1] == 'test':
	test()