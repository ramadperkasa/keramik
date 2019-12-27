module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'http://192.168.12.44:4000'
  },
  pwa: {
    name: 'Kadin',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the manifest options
    manifestOptions: {
      display: 'standalone',
      background_color: '#42B883',
      start_url: '/',
      gcm_sender_id: '833165555030'
      // ...other Manifest options...
    },
  }
}