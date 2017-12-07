#!/usr/bin/python3
import dbconnect
import sys

def coDxList(op_dx_limit=100,co_dx_limit=100):
	conn = dbconnect.connect()

	sql = "select * , co_dx as display_name from co_dx_options"

	cursor = conn.cursor()
	#cursor.execute(sql,(op_dx_limit,co_dx_limit))
	cursor.execute(sql)

	result = cursor.fetchall()
	for res in result:
		parts = res['co_dx'].split(':')
		res['co_dx_code'] = parts[0]
		res['co_dx_name'] = parts[1]
	return result


def coPcdList(op_pcd_limit=100,co_pcd_limit=100):
	conn = dbconnect.connect()

	sql = "select * , procdesc as display_name from co_pcd_options"

	cursor = conn.cursor()
	#cursor.execute(sql,(op_pcd_limit,co_pcd_limit))
	cursor.execute(sql)

	result = cursor.fetchall()
	for res in result:
		parts = res['PROCDESC'].split(':')
		res['co_pcd_code'] = parts[0]
		res['co_pcd_name'] = parts[1]
	return result

def test():
	result = coDxList(200,200)
	for res in result:
		print(res)

if len(sys.argv) > 1 and sys.argv[1] == 'test':
	test()