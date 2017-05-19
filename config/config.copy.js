module.exports = {
  include: [
    {
      src: ['{{SRC}}/assets/**/*'],
      dest: '{{WWW}}/assets'
    },
    {
      src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
      dest: '{{WWW}}'
    },
    {
      src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
      dest: '{{WWW}}/assets/fonts'
    },
    {
      src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
      dest: '{{BUILD}}'
    },
    {
      src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
      dest: '{{BUILD}}'
    },
    {
      src: './node_modules/chart.js/dist/Chart.bundle.min.js',
      dest: '{{BUILD}}/Chart.bundle.min.js'
    }
  ]
}