(function () {
  'use strict';

  var config = { responsive: true, displaylogo: false, displayModeBar: false, scrollZoom: false };
  var storeColors = { 'Green Street': '#2f6f5e', 'Library Kiosk': '#c2713b', 'Research Park': '#4f6fa8' };
  var categoryColors = { Coffee: '#2f6f5e', Food: '#c2713b', Tea: '#4f6fa8' };

  function showError() {
    document.querySelectorAll('.coffee-sales .plot').forEach(function (el) {
      el.textContent = 'The interactive chart could not load. The findings below summarize the results. Please reload to try again.';
    });
  }

  if (!window.Plotly) {
    showError();
    return;
  }

  fetch('coffee-sales/summary.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Could not load chart data');
      return response.json();
    })
    .then(function (data) {
      var lines = Object.keys(data.daily_revenue).map(function (store) {
        var rows = data.daily_revenue[store];
        return {
          type: 'scatter', mode: 'lines', name: store,
          x: rows.dates, y: rows.revenue,
          line: { color: storeColors[store], width: 2 },
          hovertemplate: '$%{y:,.2f}<extra>' + store + '</extra>'
        };
      });
      var bars = Object.keys(categoryColors).map(function (category) {
        var rows = data.items.filter(function (row) { return row.category === category; });
        return {
          type: 'bar', orientation: 'h', name: category,
          x: rows.map(function (row) { return row.revenue; }),
          y: rows.map(function (row) { return row.item; }),
          customdata: rows.map(function (row) { return row.units; }),
          marker: { color: categoryColors[category] },
          hovertemplate: '%{y}<br>Revenue: $%{x:,.2f}<br>Units sold: %{customdata:,}<extra>' + category + '</extra>'
        };
      });

      var common = {
        font: { family: 'system-ui, sans-serif', color: '#1d2433', size: 12 },
        paper_bgcolor: '#ffffff', plot_bgcolor: '#ffffff',
        legend: { orientation: 'h', x: 0, y: -0.25 },
        autosize: true
      };
      return Promise.all([
        Plotly.newPlot('daily-chart', lines, Object.assign({}, common, {
          hovermode: 'x unified',
          xaxis: { automargin: true, nticks: 5 },
          yaxis: { title: 'Revenue ($)', tickprefix: '$', automargin: true },
          margin: { t: 16, r: 12, b: 110, l: 55 }
        }), config),
        Plotly.newPlot('items-chart', bars, Object.assign({}, common, {
          barmode: 'relative',
          xaxis: { title: 'Revenue ($)', tickprefix: '$', nticks: 3, automargin: true },
          yaxis: { type: 'category', categoryorder: 'array', categoryarray: data.items.map(function (row) { return row.item; }), automargin: true },
          margin: { t: 16, r: 12, b: 100, l: 135 }
        }), config)
      ]);
    })
    .catch(showError);
}());
