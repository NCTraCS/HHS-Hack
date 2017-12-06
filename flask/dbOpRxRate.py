#!/usr/bin/python3
import sys
import pymysql
import dbconnect
import xtile

#get data from gaz_county table
#return as json
def rate(state_fips=None):
	conn = dbconnect.connect()
	sql = "select cdc_county_rx_rate_2016.*, "\
		"gaz_county.pop2010, "\
		"gaz_county.hu2010 "\
		"from cdc_county_rx_rate_2016   "\
		"join gaz_county on cdc_county_rx_rate_2016.stcou_fips=gaz_county.geoid "\

	qstate = state_fips
	if state_fips != None:
		qstate = str(state_fips).zfill(2) + '___'
		sql += " where cdc_county_rx_rate_2016.stcou_fips like %s"

	cursor = conn.cursor()
	cursor.execute(sql,(qstate))
	#cursor.execute(sql)
	result = cursor.fetchall()
	return result

def rateTile(state_fips,ntiles=10,idStCouFips=None):
	counties = rate(state_fips)
	tileout = xtile.calcTiles(counties,'rx_rate','pop2010',ntiles)
	ret = {}
	idTiles = []
	if idStCouFips:
		for county in tileout['data']:
			if idStCouFips == county['stcou_fips']:
				idTiles = county['tiles']
				break

		ret['id_stcou_fips'] = idStCouFips
		ret['id_tiles'] = idTiles

	#set x and int score
	for tile in tileout['tiles']:
		tile['x'] = tile['id']+1
		tile['scoreInt'] = round(tile['score'])

	idX = []
	for id in idTiles:
		idX.append(id+1)
	ret['idX'] = idX
	ret['idTiles'] = idTiles


	ret['filter_state_fips'] = state_fips
	ret['ntiles'] = ntiles
	ret['tiles'] = tileout['tiles']
	return(ret)

def test():
	state = 10
	idCounty = '10005'
	print("TESTING cdc county rx rate 2016")
	counties = rate(state)
	#print("Counties for state {}".format(state))
	#for county in counties:
	#	print(county)
	#	#print("name: {}	fips: {}	population: {:d}".format(county['name'], county['geoid'], county['pop2010']))
	tiles = rateTile(state,10,idCounty)
	print(tiles)
	#for tile in tiles['tiles']:
	#	print(tile)


if len(sys.argv) > 1 and sys.argv[1] == 'test':
	test()