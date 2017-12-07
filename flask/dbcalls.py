#!/usr/bin/python3
import pymysql
import dbconnect

#connection to local mysql with local credentials
def connect(cdb='opiod_dev',cclass=pymysql.cursors.DictCursor):
	connection = pymysql.connect(host='argus.ad.unc.edu',
			user='webuser',
			password='Opiod2017@UNC',
			db=cdb,
			cursorclass=cclass)
	return connection

#get data from gaz_county table
#return as json
def gaz(state_fips=None):
	conn = dbconnect.connect()
	sql = "select name, geoid as county_id, (pop2010/aland_sqmi) as popSqMil from gaz_county"
	if state_fips != None:
		sql += " where state_fips=%s"

	cursor = conn.cursor()
	cursor.execute(sql,(state_fips))
	result = cursor.fetchall()
	return result

#get a list of available states to select from
def st(state=None):
    conn = dbconnect.connect()
    sql = "select distinct usps, state_fips from gaz_county"
    if state != None:
        sql += " where state_fips=%s"

    cursor = conn.cursor()
    cursor.execute(sql,(state))
    result = cursor.fetchall()
    return result

def cdc_rates(state=None, county=None):
    conn = dbconnect.connect()
    sql = "select distinct * from gaz_county gaz left join cdc_county_rx_rate_2016 cdc on trim(gaz.geoid)=trim(cdc.stcou_fips) where cdc.rx_rate is not null"
    if state != None:
        sql += " and state_fips=%s"
        if county != None:
            sql += "  and county_fips=%c"
    cursor = conn.cursor()
    if state != None and county != None:
        cursor.execute(sql,(state, county))
    elif state != None:
        cursor.execute(sql,(state))
    else:
        cursor.execute(sql)
    result = cursor.fetchall()
    return result
