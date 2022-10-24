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
    loadGoogleSheet(
      '1g22PqPGaLXL-3DJeSkGlN-YS-_6Bju8igvoq-kDrp8o',
      '最新消息',
      { '日期': 'publish_at', '標題': 'title', '首圖': 'cover', '內文': 'content' },
      function(data) { $this.newses = data; }
    );
  }
})

document.addEventListener('DOMContentLoaded', function() {
  newsApp.mount('#newsApp')
});
