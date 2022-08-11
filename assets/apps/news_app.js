const { createApp } = Vue

var newsApp = createApp({
  data() {
    return {
      newses: [],
      currentNews: {}
    }
  },
  computed: {
    groupedNewses: function() {
      const groupedNewses = {};

      this.latestNewses.forEach((row) => {
        groupedNewses[row['year']] ||= {}
        groupedNewses[row['year']][row['month']] ||= []
        groupedNewses[row['year']][row['month']].push(row)
      });

      return groupedNewses;
    },
    latestNewses: function () {
      return this.newses.sort((a, b) => {
        if (b['publish_at'] > a['publish_at']) return 1;
        else return -1;
      });
    }
  },
  methods: {
    getReverseSortedKeys: function(obj) {
      return Object.keys(obj).sort(function(a, b) {
        return b - a;
      });
    }
  },
  created: function() {
    const $this = this;
    loadData(function(data) {
      $this.newses = processRows(data);
    });
  }
})

document.addEventListener('DOMContentLoaded', function() {
  newsApp.mount('#newsApp')
});

function loadData(callback) {
    const sheetId = '1g22PqPGaLXL-3DJeSkGlN-YS-_6Bju8igvoq-kDrp8o';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = '最新消息';
    const query = encodeURIComponent('Select *')
    const url = `${base}&sheet=${sheetName}&tq=${query}`

    const data = [];
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
            callback(data);
        })
}

function processRows(json) {
    const newses = [];
    const months = [];
    const keysMap = { '日期': 'publish_at', '標題': 'title', '首圖': 'cover', '內文': 'content' };

    json.forEach((row) => {
      var processedRow = {};
      Object.keys(row).map((key) => {
        processedRow[keysMap[key] || key] = row[key];
      });

      if (processedRow['publish_at']) {
        const theDate = new Date(processedRow['publish_at'])
        processedRow['year'] = theDate.getFullYear();
        processedRow['month'] = theDate.getMonth() + 1;
        processedRow['date'] = theDate.getDate();
      }
      if (processedRow['content']) {
        processedRow['html'] = marked.parse(processedRow['content']);
        processedRow['first_paragraph'] = processedRow['content'].split('\n')[0];
      }

      const today = (new Date());
      const currentMonth = today.getMonth() + 1;
      if (today.getFullYear() == processedRow['year']) {
        if (processedRow['month'] <= currentMonth && processedRow['month'] > (currentMonth - 3)) processedRow['class'] = '_current';
        if (processedRow['month'] > currentMonth) processedRow['class'] = '_future';
      }

      newses.push(processedRow);
    })

  return newses;
}
