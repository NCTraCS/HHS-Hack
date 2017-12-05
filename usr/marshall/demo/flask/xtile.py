#!/usr/bin/python
import copy
import math
'''
USAGE
popscore = [
	{'id': 1, 'somescore':  9,	'pop': 700},
	{'id': 2, 'somescore':  20,	'pop': 500},
	{'id': 3, 'somescore':  11,	'pop': 100},
	{'id': 4, 'somescore':  15,	'pop': 300},
	{'id': 5, 'somescore':  12,	'pop': 100},
]
ntiles = 10 
tileRec = xtile.calcTiles(popscore,'somescore','pop',ntiles)
xtile.printTiles(tileRec)
'''

def printTiles(tileRec):
	print("DATA:")
	for v in tileRec['data']:
		print(v)
		#print("id: {:d}	score: {:d}	pop: {:d}	sp: {:.1f}	iaggr: {:d}	aggr: {:d}".format(v['id'],v['score'], v['pop'], v['score'] * v['pop'],v['iaggr'],v['aggr']))
	print("TILES:")
	for v in tileRec['tiles']:
		print(v)


def calcTiles(inputList,score,wt,ntiles):
	tileRec = {'ntiles': ntiles}
	tiles = []
	data = copy.deepcopy(inputList)
	totwt = sum(item[wt] for item in inputList)
	tilewt = totwt/ntiles
	totwtscore = sum( (item[wt] * item[score]) for item in inputList)

	#debug
	#print("totwt: {:d}".format(totwt))
	#print("tilewt: {:f}".format(tilewt))
	# sort input data by score
	data = sorted(data, key=lambda row: row[score])

	# add aggregate weights
	aggr=0
	for v in data:
		v['iaggr'] = aggr
		aggr += v[wt]
		v['aggr'] = aggr
		v['wtscore'] = v[wt] * v[score]
		v['tiles'] = []

	# init ntiles array
	for i in range(ntiles):
		tiles.append( {'id': i, 'score': 0, 'wt': 0, 'wtscore': 0} )

	# set tiles
	tot = 0
	for v in data:
		v['tiles']  =[]
		tilenum = math.floor(v['iaggr'] / tilewt)
		toAlloc = v[wt]
		for t in tiles:
			if t['wt'] < tilewt and toAlloc > 0:
				leftInTile = tilewt - t['wt']
				if toAlloc > leftInTile:
					tileAlloc = leftInTile
				else:
					tileAlloc = toAlloc
				t['wt'] += tileAlloc
				if t['id'] not in v['tiles']:
					v['tiles'].append(t['id'])
				if tileAlloc and v[wt]:
					t['wtscore'] += (v[wt] * v[score]) * (tileAlloc/v[wt])
				toAlloc -= tileAlloc

	# update ntiles array
	for i in range(ntiles):
		if tiles[i]['wt']:
			tiles[i]['score'] = tiles[i]['wtscore'] / tiles[i]['wt']

	tileRec['data'] = data
	tileRec['tiles'] = tiles
	return(tileRec)