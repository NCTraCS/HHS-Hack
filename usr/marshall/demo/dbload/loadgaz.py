#!/usr/bin/python3
import sys
import csv
import dbconn

def runSql(conn, sql):
	with conn.cursor() as cursor:
		cursor.execute(sql)
		result = cursor.fetchall()
		for db in result:
			print(db)

#load data with python, like below
#or with mysqlimport
#or with sql>load data
def loadGazCounty(conn):
	fname = "./gaz_county.csv"
	csvfile = open(fname, encoding='latin-1')
	reader = csv.reader(csvfile, delimiter=',',quotechar='"')
	count=0
	for row in reader:
		print(row)
		count+=1
		if count < 2:
			continue
		usps = row[0]
		geoid = row[1]
		state_fips = row[2]
		county_fips = row[3]
		ansicode = row[4]
		name = row[5]
		pop2010 = row[6]
		hu2010 = row[7]
		aland = row[8]
		awater = row[9]
		aland_sqmi = row[10]
		awater_sqmi = row[11]
		lat = row[12]
		lng = row[13]

		"""
		usps
		geoid
		state_fips
		county_fips
		ansicode
		name
		pop2010
		hu2010
		aland
		awater
		aland_sqmi
		awater_sqmi
		lat
		lng
		"""

		print(state_fips, county_fips,name)

		sql = "insert into gaz_county(\
			usps,\
			geoid,\
			state_fips,\
			county_fips,\
			ansicode,\
			name,\
			pop2010,\
			hu2010,\
			aland,\
			awater,\
			aland_sqmi,\
			awater_sqmi,\
			lat,\
			lng\
		)  values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" 
				 
		conn.cursor().execute(sql,
			(
			usps,
			geoid,
			state_fips,
			county_fips,
			ansicode,
			name,
			pop2010,
			hu2010,
			aland,
			awater,
			aland_sqmi,
			awater_sqmi,
			lat,
			lng
			)
		)
		conn.commit()

print("BEGIN Load Census Data")
conn = dbconn.connect()
loadGazCounty(conn)
