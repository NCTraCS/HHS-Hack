#!/usr/bin/python3
import dbconnect
import sys

def coDxList(op_dx_limit=100,co_dx_limit=100):
	conn = dbconnect.connect()

	sql = ""\
	"select * from "\
	"( "\
	"select distinct co_dx,'low' as prob from "\
	"( "\
	"select "\
	"	 mdc.unch_simple_generic_name, mdc.icd10desc as co_dx, ddc.DX1 as op_dx, ddc.p, dx2denom "\
	"from  "\
	"	opiod_dev.meddxchis_new mdc JOIN opiod_dev.dxdxchis ddc ON ddc.DX2 = mdc.icd10desc  "\
	"where  "\
	"	mdc.p > 0.05 and ddc.p > 0.05  and ddc.dx1denom >= 100 and ddc.dx2denom >= 1000 "\
	"order by ddc.dx2denom desc "\
	") as subq_low2 "\
	"UNION "\
	"select distinct co_dx,'high' as prob from "\
	"( "\
	"select "\
	"	 mdc.unch_simple_generic_name, mdc.icd10desc as co_dx, ddc.DX1 as op_dx, ddc.p, dx2denom "\
	"from  "\
	"	opiod_dev.meddxchis_new mdc JOIN opiod_dev.dxdxchis ddc ON ddc.DX2 = mdc.icd10desc  "\
	"where  "\
	"	mdc.p < 0.001 and ddc.p < 0.001 and ddc.dx1denom >= 100 and ddc.dx2denom >= 5000 "\
	"order by ddc.dx2denom desc "\
	") as subq_high2 "\
	") as subqtop "\
	"where co_dx in "\
	"( "\
	"select co_dx from "\
	"( "\
	"select co_dx , count(*) from "\
	"( "\
	"select distinct co_dx,'low' as prob from "\
	"( "\
	"select "\
	"	 mdc.unch_simple_generic_name, mdc.icd10desc as co_dx, ddc.DX1 as op_dx, ddc.p, dx2denom "\
	"from  "\
	"	opiod_dev.meddxchis_new mdc JOIN opiod_dev.dxdxchis ddc ON ddc.DX2 = mdc.icd10desc  "\
	"where  "\
	"	mdc.p > 0.05 and ddc.p > 0.05  and ddc.dx1denom >= 100  and ddc.dx2denom >= 1000 "\
	"order by ddc.dx2denom desc "\
	") as subq_low2 "\
	"UNION "\
	"select distinct co_dx,'high' as prob from "\
	"( "\
	"select "\
	"	 mdc.unch_simple_generic_name, mdc.icd10desc as co_dx, ddc.DX1 as op_dx, ddc.p, dx2denom "\
	"from  "\
	"	opiod_dev.meddxchis_new mdc JOIN opiod_dev.dxdxchis ddc ON ddc.DX2 = mdc.icd10desc  "\
	"where  "\
	"	mdc.p < 0.001 and ddc.p < 0.001 and  ddc.dx1denom >= 100 and ddc.dx2denom >= 5000 "\
	"order by ddc.dx2denom desc "\
	") as subq_high2 "\
	") as subq3 "\
	"group by co_dx "\
	"having count(*) <= 1 "\
	") as subqtop "\
	") "\

	cursor = conn.cursor()
	#cursor.execute(sql,(op_dx_limit,co_dx_limit))
	cursor.execute(sql)

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