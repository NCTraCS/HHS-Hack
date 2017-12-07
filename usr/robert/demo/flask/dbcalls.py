#!/usr/bin/python3
import pymysql

#connection to local mysql with local credentials
def connect(cdb='hack',cclass=pymysql.cursors.DictCursor):
	connection = pymysql.connect(host='localhost',
			user='webuser',
			password='localonly',
			db=cdb,
			cursorclass=cclass)
	return connection

#get data from gaz_county table
#return as json
def gaz(state_fips=None):
	conn = connect()
	sql = "select * from gaz_county"
	if state_fips != None:
		sql += " where state_fips=%s"

	cursor = conn.cursor()
	cursor.execute(sql,(state_fips))
	result = cursor.fetchall()
	return result

#get a list of available states to select from
def st(state=None):
    conn = connect()
    sql = "select distinct usps, state_fips from gaz_county"
    if state != None:
        sql += " where state_fips=%s"

    cursor = conn.cursor()
    cursor.execute(sql,(state))
    result = cursor.fetchall()
    return result

def cdc_rates(state=None, county=None):
    conn = connect()
    sql = "select distinct * from gaz_county gaz left join cdc_county_rx_rate_2016 cdc on trim(gaz.geoid)=trim(cdc.stcou_fips) where cdc.rx_rate is not null"
    if state != None:
        sql += " and state_fips=%s"
    if county != None:
        sql += "  and county_fips=%c"
    cursor = conn.cursor()
    if state != None and county != None:
        cursor.execute(sql,(state, county))
    else:
        cursor.execute(sql,(state))
    result = cursor.fetchall()
    return result
