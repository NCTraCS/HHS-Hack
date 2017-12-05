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