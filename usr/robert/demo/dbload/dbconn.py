#!/usr/bin/python3
import pymysql

def connect(cdb='hack',cclass=pymysql.cursors.DictCursor):
	connection = pymysql.connect(host='localhost',
			user='webuser',
			password='localonly',
			db=cdb,
			cursorclass=cclass)
	return connection