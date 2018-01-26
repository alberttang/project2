// DATA CONSTRUCTOR
var Data = function (value, label, type) {
  // VALUE
  this.value = value;
  // LABEL
  this.label = label;
  // TYPE
  this.type = type;
}; // END DATA CONSTRUCTOR

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

module.exports = Data;