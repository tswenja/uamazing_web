const sheetId = '1g22PqPGaLXL-3DJeSkGlN-YS-_6Bju8igvoq-kDrp8o';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = '最新消息';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`

const data = []
document.addEventListener('DOMContentLoaded', init)

function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            //console.log(rep)

            const colz = [];
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                }
            })

            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? (rowData.c[ind].f || rowData.c[ind].v) : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}

function processRows(json) {
    const { createApp } = Vue
    const groupedNewses = {}
    const months = []

    json.forEach((row) => {
        if (row['日期']) {
          const theDate = new Date(row['日期'])
          row['year'] = theDate.getFullYear();
          row['month'] = theDate.getMonth() + 1;
          row['date'] = theDate.getDate();
        }
        if (row['內文']) {
          row['html'] = marked.parse(row['內文']);
          row['first_paragraph'] = row['內文'].split('\n')[0];
        }

        const today = (new Date());
        const currentMonth = today.getMonth() + 1;
        if (today.getFullYear() == row['year']) {
          if (row['month'] <= currentMonth && row['month'] > (currentMonth - 3)) row['class'] = '_current';
          if (row['month'] > currentMonth) row['class'] = '_future';
        }

        groupedNewses[row['year']] ||= {}
        groupedNewses[row['year']][row['month']] ||= []
        groupedNewses[row['year']][row['month']].push(row)
    })

    createApp({
      data() {
        return {
          newses: groupedNewses,
          currentNews: {}
        }
      },
      methods: {
        getReverseSortedKeys: function(obj) {
          return Object.keys(obj).sort(function(a, b) {
            return b - a;
          });
        }
      }
    }).mount('#newsApp')
}
