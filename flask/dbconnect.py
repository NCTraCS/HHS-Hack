#!/usr/bin/python3
import pymysql

#connection to local mysql with local credentials
def connect(cdb='opiod_dev',cclass=pymysql.cursors.DictCursor):
	connection = pymysql.connect(host='argus.ad.unc.edu',
			user='webuser',
			password='Opiod2017@UNC',
			db=cdb,
			cursorclass=cclass)
	return connection
