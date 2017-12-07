#!/usr/bin/python3
import sys
import pymysql
import dbconnect

def employment(empStatus=None):
	#hs or less 1
	#
	'''
	conn = dbconnect.connect()
	sql = ""\
	"select "\
	"emp_status, "\
	"count(*) as count "\
	"from "\
	"( "\
	"select "\
	"    case when ted.EMPLOY = 1 then 'employed' "\
	"        when ted.EMPLOY = 2 then 'employed' "\
	"        when ted.EMPLOY = 3 then 'unemployed' "\
	"        when ted.EMPLOY = 4 then 'unemployed' end as emp_status "\
	"from teda2012a ted "\
	"where STFIPS = 36) as teddata "\
	"where emp_status is not null "\
	"group by "\
	"emp_status "\


	cursor = conn.cursor()
	cursor.execute(sql)
	result = cursor.fetchall()
	'''


	result = [
    {
      "count": 53367, 
      "emp_status": "employed",
      "axis_label": "employed"
    }, 
    {
      "count": 240756, 
      "emp_status": "unemployed", 
      "axis_label": "unemployed", 
    }
  	] 

	score = 0
	for emp in result:
		if empStatus:
			if emp['emp_status'] == empStatus:
				emp['id_emp_status'] = 'true'
				emp['fill'] = 'red'
				if empStatus == 'employed':
					score = 0
				else:
					score = 2
				emp['score'] = score

	ret = {}
	ret['id_emp_status'] = empStatus
	ret['score'] = score
	ret['data'] = result
	return ret

def education(edLevel=None):
	#hs or less 1
	#
	'''
	conn = dbconnect.connect()
	sql = ""\
	"select "\
	"ed_level, "\
	"count(*) as count "\
	"from "\
	"( "\
	"select "\
	"    case when ted.EDUC = 1 then '12_or_less' "\
	"        when ted.EDUC = 2 then '12_or_less' "\
	"        when ted.EDUC = 3 then '12_or_less' "\
	"        when ted.EDUC = 4 then '13_to_15' "\
	"        when ted.EDUC = 5 then '16_plus' end as ed_level "\
	"from teda2012a ted "\
	"where STFIPS = 36) as teddata "\
	"where ed_level is not null "\
	"group by "\
	"ed_level "\

	cursor = conn.cursor()
	cursor.execute(sql)
	result = cursor.fetchall()
	'''

	result = [
    {
      "count": 212585, 
      "ed_level": "12_or_less",
      "axis_label": "12 or less"
    }, 
    {
      "count": 62723, 
      "ed_level": "13_to_15", 
      "axis_label": "13 to 15"
    }, 
    {
      "count": 18855, 
      "ed_level": "16_plus",
      "axis_label": "16 plus"
    }
  	] 

	score = 0
	for ed in result:
		if edLevel:
			if ed['ed_level'] == edLevel:
				ed['id_ed_level'] = 'true'
				ed['fill'] = 'red'
				if edLevel == '12_or_less':
					score = 1
				elif edLevel == '13_to_15':
					score = 0.5
				else:
					score = 0
				ed['score'] = score

	ret = {}
	ret['id_ed_level'] = edLevel
	ret['score'] = score
	ret['data'] = result
	return ret

def test():
	#res = deathPerCap('OsWeGo')
	res = employment('unemployed')
	print("status:")
	print(res['id_emp_status'])
	print("score:")
	print(res['score'])
	for ed in res['data']:
		print(ed)

if len(sys.argv) > 1 and sys.argv[1] == 'test':
	test()