import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col } from 'react-bootstrap';

/*
const data = [
  {decile: 1, rxrate: .3},
  {decile: 2, rxrate: 2},
  {decile: 3, rxrate: 5, label:"My\nRisk", fill: "red"},
  {decile: 4, rxrate: 9},
  {decile: 5, rxrate: 10},
  {decile: 6, rxrate: 14},
  {decile: 7, rxrate: 19},
  {decile: 8, rxrate: 22},
  {decile: 9, rxrate: 29},
  {decile: 10, rxrate: 37}
];
*/
class Two extends Component {
	constructor(props) {
		super(props);
		this.props.chartCallbacks.getOpRxRateTiles();

	}
	//updateData(opRxRateTiles) {
	//	console.log(opRxRateTiles)
	//}
	render() {
		/*
	const data = [
	  {id: 0, x: 1, scoreInt: 44},
	  {id: 0, x: 2, scoreInt: 54},
	  {id: 0, x: 3, scoreInt: 58}, //, label:"My\nRisk", fill: "red"},
	  {id: 0, x: 4, scoreInt: 9},
	  {id: 0, x: 5, scoreInt: 10},
	  {id: 0, x: 6, scoreInt: 14},
	  {id: 0, x: 7, scoreInt: 19},
	  {id: 0, x: 8, scoreInt: 22},
	  {id: 0, x: 9, scoreInt: 29},
	  {id: 0, x: 10, scoreInt: 37}
	];
	*/


	 const data = [
    {
      "id": 0, 
      "score": 43.90903317126666, 
      "scoreInt": 44, 
      "wt": 952550.3, 
      "wtscore": 41825562.720000006, 
      "x": 1
    }, 
    {
      "id": 1, 
      "score": 54.427545065074256, 
      "scoreInt": 54, 
      "wt": 952550.3, 
      "wtscore": 51844974.38, 
      "x": 2
    }, 
    {
      "id": 2, 
      "score": 57.50063687975323, 
      "scoreInt": 58, 
      "wt": 952550.3, 
      "wtscore": 54772248.910000004, 
      "x": 3
    }, 
    {
      "id": 3, 
      "score": 72.66921199856849, 
      "scoreInt": 73, 
      "wt": 952550.3, 
      "wtscore": 69221079.69000001, 
      "x": 4
    }, 
    {
      "id": 4, 
      "score": 77.44315045620164, 
      "scoreInt": 77, 
      "wt": 952550.3, 
      "wtscore": 73768496.2, 
      "x": 5
    }, 
    {
      "id": 5, 
      "score": 81.64895970323037, 
      "scoreInt": 82, 
      "wt": 952550.3, 
      "wtscore": 77774741.06, 
      "x": 6
    }, 
    {
      "id": 6, 
      "score": 88.04060590816044, 
      "scoreInt": 88, 
      "wt": 952550.3, 
      "wtscore": 83863105.57000001, 
      "x": 7
    }, 
    {
      "id": 7, 
      "score": 100.21512250849116, 
      "scoreInt": 100, 
      "wt": 952550.3, 
      "wtscore": 95459945.01000002, 
      "x": 8
    }, 
    {
      "id": 8, 
      "score": 117.74902753166947, 
      "scoreInt": 118, 
      "wt": 952550.3, 
      "wtscore": 112161871.50000001, 
      "x": 9
    }, 
    {
      "id": 9, 
      "score": 142.55511111591693, 
      "scoreInt": 143, 
      "wt": 952550.2999999996, 
      "wtscore": 135790913.85999995, 
      "x": 10
    }
  ];
  //console.log("DATA")
  //console.log(data);
  //console.log("REST")
  //console.log(this.props.chartData.tiles);
  		if(this.props.chartData.tiles) {
  			for( let tile of this.props.chartData.tiles ){
  				console.log(tile);
  				if( this.props.chartData.idTiles.indexOf(tile['id']) > -1 )
  					tile['fill'] = 'red';
  			}


		return(
			<div>
      			<h1>Victory Charts Demo</h1>
				<VictoryChart 
					theme={VictoryTheme.material}
					domainPadding={[30,30]}
				>
					<VictoryAxis
							tickValues={[1, 10]}
							tickFormat={["Lower", "Higher"]}
					/>
					<VictoryAxis
							dependentAxis
					/>
					<VictoryBar
						padding={{top: 3, bottom: 3}}
							data={this.props.chartData.tiles}
							TESTdata={data}
							x="x"
							y="scoreInt"
					/>
				</VictoryChart>						
	      	</div>
      	);
  		}
		else
			return(<p>loading</p>);
	}
}

export default Two;