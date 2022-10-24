const { createApp } = Vue

var eventsModel = createApp({
  data() {
    return {
      events: [],
      currentEvent: {}
    }
  },
  computed: {
    groupedEvents: function() {
      const groupedEvents = {};

      this.latestEvents.forEach((row) => {
        groupedEvents[row['year']] ||= []
        groupedEvents[row['year']].push(row)
      });

      return groupedEvents;
    },
    latestEvents: function () {
      return this.events.sort((a, b) => {
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
      '1X1M6lDN863sonYaP9HhW3JQWX2sl0gVRdbbPz0HeK68',
      '活動',
      { '日期': 'publish_at', '類型': 'type', '標題': 'title', '首圖': 'cover', '內文': 'content' },
      function(data) { $this.events = data; }
    );
  }
})

document.addEventListener('DOMContentLoaded', function() {
  eventsModel.mount('[data-app~="eventsModel"]');
});
