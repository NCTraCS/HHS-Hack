#!/usr/bin/python

import xtile

popscore = [
	{'id': 1, 'somescore':  9,	'pop': 700},
	{'id': 2, 'somescore':  20,	'pop': 500},
	{'id': 3, 'somescore':  11,	'pop': 100},
	{'id': 4, 'somescore':  15,	'pop': 300},
	{'id': 5, 'somescore':  12,	'pop': 100},
]

ntiles = 8 
tileRec = xtile.calcTiles(popscore,'somescore','pop',ntiles)
xtile.printTiles(tileRec)
