import '../stylus/main.styl';

export interface PluginBaseInterface {
  _init(plugin: any): Promise<any>;
}

export default class PluginBase implements PluginBaseInterface {

  private settings: any = {
    target: '',
    items: 1
  };

  private keys: Array<any> = [];

  private counter: any = 1;

  constructor(plugin: any = {target: '', settings: {}}) {

    this._init(plugin);

  }

  public _init(plugin: any): Promise<any> {

    this.settings.target = plugin.target;

    try {

      this.keys = Object.keys(plugin.settings);

      return new Promise((resolve, reject) => {

        if(!this.keys.length) {
          return resolve(this.settings);
        }

        this.keys.forEach(key => {
          if (plugin.settings[key] != '') {
            this.settings[key] = plugin.settings[key];
          }
          if (this.counter >= this.keys.length) {
            resolve(this.settings);
          }
          this.counter += 1;
        });
      }).then(settings => {
        /**
         * Settings.target é o ID do container onde o plugin é encapsulado
         */
        console.log('funcionou');
      });

    } catch (e) {
      console.log(`Erro no plugin: BasePlugin`, e);
    }
  }
}
