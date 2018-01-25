
var data = [{
    values: [19, 26, 55],
    labels: ['1', '2', '3'],
    type: 'pie'
  }];

  var layout = {
    autosize: false,
    width: 500,
    height: 250,
    margin: {
      l: 0,
      r: 0,
      b: 25,
      t: 25,
      pad: 1
    },
    paper_bgcolor: 'fff',
    plot_bgcolor: '#c7c7c7'
}
  
  Plotly.newPlot('myDiv', data, layout);

