#!/usr/bin/python3
import dbconnect
import sys

def coDxList(op_dx_limit=100,co_dx_limit=100):
	conn = dbconnect.connect()
	sql = "select distinct co_dx from "\
		"( "\
		"select "\
		"mdc.unch_simple_generic_name, "\
		"mdc.icd10desc as co_dx, "\
		"ddc.DX1 as op_dx "\
		"from opiod_dev.meddxchis_new mdc "\
		"JOIN opiod_dev.dxdxchis ddc ON ddc.DX2 = mdc.icd10desc "\
		"where ddc.p <= 0.001 and mdc.p <= 0.001 "\
		"and ddc.dx1denom >= %s "\
		"and ddc.dx2denom >= %s "\
		") as subq "\

	cursor = conn.cursor()
	cursor.execute(sql,(op_dx_limit,co_dx_limit))

	result = cursor.fetchall()
	for res in result:
		parts = res['co_dx'].split(':')
		res['co_dx_code'] = parts[0]
		res['co_dx_name'] = parts[1]
	return result

def test():
	result = coDxList(200,200)
	for res in result:
		print(res)

if len(sys.argv) > 1 and sys.argv[1] == 'test':
	test()