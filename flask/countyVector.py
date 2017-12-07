#!/usr/bin/python3
import sys
import pymysql
import dbconnect

def deathPerCap(id_county=None):
	#SCORING
	# 0 - 0.02 => 0
	# 0.021 - 0.04 => 0.5
	# 0.041 - 0.06 => 1
	# > 0.06 => 1.5
	#
	conn = dbconnect.connect()
	sql = ""\
	"SELECT county_fips as stcou_fips, PatientCountyName as county_name,'NY' as state_name,PerCapitaDeaths as per_capita_deaths ,Population as population FROM countyvector where PerCapitaDeaths is not null order by PatientCountyName"

	cursor = conn.cursor()
	cursor.execute(sql)
	result = cursor.fetchall()

	id_stcou_fips = None
	score = 0
	for county in result:
		if county['per_capita_deaths']:
			county['per_capita_deaths'] = float(county['per_capita_deaths'])
		if id_county:
			if county['county_name'].lower() == id_county.lower():
				county['id_county_flag'] = 'true'
				id_stcou_fips = county['stcou_fips']
				pcd = county['per_capita_deaths']
				if pcd <= 0.02:
					score = 0
				elif pcd <= 0.04:
					score = 0.5
				elif pcd <= 0.06:
					score = 1
				else:
					score = 1.5
				county['score'] = score

	ret = {}
	ret['id_county'] = id_county
	ret['score'] = score
	ret['counties'] = result
	return ret

def opDischPerCap(id_county=None):
	#SCORING
	# 0 - 0.05 => 0
	# 0.051 - 0.1 => 0.5
	# > 0.1 => 1.0
	conn = dbconnect.connect()
	sql = ""\
	"SELECT PatientCountyName as county_name,'NY' as state_name,OpioidDischPerCap as per_capita_op_disch ,Population as population FROM countyvector where OpioidDischPerCap is not null"

	cursor = conn.cursor()
	cursor.execute(sql)
	result = cursor.fetchall()

	score = 0
	for county in result:
		if county['per_capita_op_disch']:
			county['per_capita_op_disch'] = float(county['per_capita_op_disch'])
		if id_county:
			if county['county_name'].lower() == id_county.lower():
				county['id_county_flag'] = 'true'
				pcd = county['per_capita_op_disch']
				if pcd <= 0.0005:
					score = 0
				elif pcd <= 0.0008:
					score = 0.5
				else:
					score = 1.0
				county['score'] = score

	ret = {}
	ret['id_county'] = id_county
	ret['score'] = score
	ret['counties'] = result
	return ret

def test():
	#res = deathPerCap('OsWeGo')
	res = opDischPerCap('erie')
	print("id county:")
	print(res['id_county'])
	print("score:")
	print(res['score'])
	for county in res['counties']:
		print(county)

if len(sys.argv) > 1 and sys.argv[1] == 'test':
	test()