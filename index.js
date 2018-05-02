$(document).ready(function() {
$.getJSON('js/2016Results.json', function (data1) {
  let data = data1.data;

  var countiesMap = Highcharts.geojson(Highcharts.maps['countries/us/us-all-all']),
    // Extract the line paths from the GeoJSON
    lines = Highcharts.geojson(Highcharts.maps['countries/us/us-all-all'], 'mapline'),
    // Filter out the state borders and separator lines, we want these in separate series
    borderLines = Highcharts.grep(lines, function (l) {
        return l.properties['hc-group'] === '__border_lines__';
    }),
    separatorLines = Highcharts.grep(lines, function (l) {
        return l.properties['hc-group'] === '__separator_lines__';
    });

  // Add state acronym for tooltip
  Highcharts.each(countiesMap, function (mapPoint) {
      mapPoint.name = mapPoint.name + ', ' + mapPoint.properties['hc-key'].substr(3, 2).toUpperCase();
  });

  // Create the map
  Highcharts.mapChart('container', {
      chart: {
          borderWidth: 1,
          marginRight: 20 // for the legend
      },

      title: {
          text: 'US Counties, Presidential Voting (2016) Actual'
      },

      legend: {
          layout: 'vertical',
          align: 'right',
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)'
      },

      mapNavigation: {
          enabled: true
      },

      colorAxis: {
          min: 0,
          max: 1,
          tickInterval: 1,          
          stops: [[0, '#0000FF'], [0.5, '#0000FF'], [0.51, '#FF0000'], [1, '#FF0000']],
          labels: {
            formatter: function() {
                if (this.value === 0) 
                    return 'D';
                else if (this.value === 1)
                    return 'R';
            }          }
      },

      plotOptions: {
          mapline: {
              showInLegend: false,
              enableMouseTracking: false
          }
      },

      series: [{
          mapData: countiesMap,
          data: data,
          joinBy: ['hc-key', 'code'],
          name: 'Voting Pattern',
          tooltip: {
            pointFormat: '{point.name}: {point.party}'
          },
          borderWidth: 0.5,
          states: {
              hover: {
                  color: '#a4edba'
              }
          }
      }, {
          type: 'mapline',
          name: 'State borders',
          data: borderLines,
          color: 'white'
      }, {
          type: 'mapline',
          name: 'Separator',
          data: separatorLines,
          color: 'gray'
      }]
  });
});

$.getJSON('js/2016Predictions.json', function (data1) {
    let data = data1.data;

    let colorCodes = [];
    let colorShades = ['#311B92', '#1976D2', '#29B6F6', '#4DD0E1', '#80CBC4', 
                       '#FFF59D', '#FFCCBC', '#E57373', '#FF5722', '#FF0000'];

    let currIndex = 0;
    for (let k = 0.01; k <= 1; k += 0.1) {
        let colorArray = [];
        colorArray.push(k.toFixed(2));
        colorArray.push(colorShades[currIndex]);
        colorCodes.push(colorArray);

        let endColor = [];
        endColor.push((k + 0.09).toFixed(2));
        endColor.push(colorShades[currIndex++]);
        colorCodes.push(endColor);
    }
  
    var countiesMap = Highcharts.geojson(Highcharts.maps['countries/us/us-all-all']),
      // Extract the line paths from the GeoJSON
      lines = Highcharts.geojson(Highcharts.maps['countries/us/us-all-all'], 'mapline'),
      // Filter out the state borders and separator lines, we want these in separate series
      borderLines = Highcharts.grep(lines, function (l) {
          return l.properties['hc-group'] === '__border_lines__';
      }),
      separatorLines = Highcharts.grep(lines, function (l) {
          return l.properties['hc-group'] === '__separator_lines__';
      });
  
    // Add state acronym for tooltip
    Highcharts.each(countiesMap, function (mapPoint) {
        mapPoint.name = mapPoint.name + ', ' + mapPoint.properties['hc-key'].substr(3, 2).toUpperCase();
    });
  
    // Create the map
    Highcharts.mapChart('prediction', {
        chart: {
            borderWidth: 1,
            marginRight: 20 // for the legend
        },
  
        title: {
            text: 'US Counties, Presidential Voting (2016) Predicted'
        },
  
        legend: {
            layout: 'vertical',
            align: 'right',
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)'
        },
  
        mapNavigation: {
            enabled: true
        },
  
        colorAxis: {
            min: -1,
            max: 1,
            tickInterval: 1,          
            stops: colorCodes,
            labels: {
                formatter: function() {
                    if (this.value === -1) 
                        return 'D';
                    else if (this.value === 1)
                        return 'R';
                }
            }
        },
  
        plotOptions: {
            mapline: {
                showInLegend: false,
                enableMouseTracking: false
            }
        },
  
        series: [{
            mapData: countiesMap,
            data: data,
            joinBy: ['hc-key', 'code'],
            name: 'Voting Pattern',
            tooltip: {
              pointFormat: '{point.name}: {point.tooltip}'
            },
            borderWidth: 0.5,
            states: {
                hover: {
                    color: '#a4edba'
                }
            }
        }, {
            type: 'mapline',
            name: 'State borders',
            data: borderLines,
            color: 'white'
        }, {
            type: 'mapline',
            name: 'Separator',
            data: separatorLines,
            color: 'gray'
        }]
    });
  });

  $('.highcharts-axis-labels highcharts-coloraxis-labels').hide();

});
