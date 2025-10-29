const fs = require('fs');
const path = require('path');

class ConfigManager {
  constructor(configPath = './config.json') {
    this.configPath = path.resolve(configPath);
    this.config = {};
    this.watchers = [];
  }

  load() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        this.config = JSON.parse(data);
        return true;
      } else {
        this.config = {};
        this.save();
        return true;
      }
    } catch (error) {
      throw new Error('Failed to load config: ' + error.message);
    }
  }

  save() {
    try {
      const dir = path.dirname(this.configPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf8');
      return true;
    } catch (error) {
      throw new Error('Failed to save config: ' + error.message);
    }
  }

  get(key, defaultValue = null) {
    const keys = key.split('.');
    let value = this.config;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return value;
  }

  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let target = this.config;

    for (const k of keys) {
      if (!(k in target) || typeof target[k] !== 'object') {
        target[k] = {};
      }
      target = target[k];
    }

    target[lastKey] = value;
    this.save();
    this.notifyWatchers(key, value);
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let target = this.config;

    for (const k of keys) {
      if (!(k in target) || typeof target[k] !== 'object') {
        return false;
      }
      target = target[k];
    }

    if (lastKey in target) {
      delete target[lastKey];
      this.save();
      return true;
    }

    return false;
  }

  reset() {
    this.config = {};
    this.save();
  }

  getAll() {
    return { ...this.config };
  }

  watch(key, callback) {
    this.watchers.push({ key, callback });
  }

  notifyWatchers(key, value) {
    for (const watcher of this.watchers) {
      if (watcher.key === key || key.startsWith(watcher.key + '.')) {
        watcher.callback(key, value);
      }
    }
  }

  merge(data) {
    this.config = this.deepMerge(this.config, data);
    this.save();
  }

  deepMerge(target, source) {
    const output = { ...target };
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}

module.exports = { ConfigManager };
