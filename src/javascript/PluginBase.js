window.PluginBase = (plugin) => {

  if(typeof plugin != 'object') {
    plugin = {}
  }

  /**
   * Default settings
   */
  let settings = {
    target: plugin.target,
    items: 1
  }

  let keys = Object.keys(plugin.settings);

  new Promise((resolve, reject) => {
    let counter = 1
    keys.forEach(key => {
      if(plugin.settings[key] != ''){
        settings[key] = plugin.settings[key]
      }
      if(counter >= keys.length) {
        resolve(settings)
      }
      counter++
    })
  }).then(settings => {
    /**
     * Settings.target é o ID do container onde o plugin é encapsulado
     */
  })  
}