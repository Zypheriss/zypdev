const fs = require('fs');
const path = require('path');

class CommandHandler {
  constructor(client, options = {}) {
    this.client = client;
    this.commandsPath = options.commandsPath || './commands';
    this.prefix = options.prefix || '!';
    this.commands = new Map();
  }

  async loadCommands() {
    try {
      const commandsDir = path.resolve(this.commandsPath);
      
      if (!fs.existsSync(commandsDir)) {
        throw new Error(`Commands directory not found: ${commandsDir}`);
      }

      const loadFiles = (dir) => {
        const files = fs.readdirSync(dir);
        
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            loadFiles(filePath);
          } else if (file.endsWith('.js')) {
            try {
              delete require.cache[require.resolve(filePath)];
              const command = require(filePath);
              
              if (command.name) {
                this.commands.set(command.name, command);
                if (command.aliases) {
                  command.aliases.forEach(alias => {
                    this.commands.set(alias, command);
                  });
                }
              }
            } catch (error) {
              console.error(`Error loading command ${file}:`, error);
            }
          }
        }
      };

      loadFiles(commandsDir);
      return this.commands.size;
    } catch (error) {
      throw new Error('Failed to load commands: ' + error.message);
    }
  }

  async handleMessage(message) {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return;

    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = this.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, this.client);
    } catch (error) {
      console.error('Error executing command:', error);
      await message.reply('There was an error executing that command.');
    }
  }

  getCommand(name) {
    return this.commands.get(name);
  }

  getAllCommands() {
    return Array.from(this.commands.values());
  }
}

class EventHandler {
  constructor(client, options = {}) {
    this.client = client;
    this.eventsPath = options.eventsPath || './events';
  }

  async loadEvents() {
    try {
      const eventsDir = path.resolve(this.eventsPath);
      
      if (!fs.existsSync(eventsDir)) {
        throw new Error(`Events directory not found: ${eventsDir}`);
      }

      let eventCount = 0;
      const files = fs.readdirSync(eventsDir);

      for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const filePath = path.join(eventsDir, file);
        
        try {
          delete require.cache[require.resolve(filePath)];
          const event = require(filePath);
          
          if (event.name && event.execute) {
            if (event.once) {
              this.client.once(event.name, (...args) => event.execute(...args, this.client));
            } else {
              this.client.on(event.name, (...args) => event.execute(...args, this.client));
            }
            eventCount++;
          }
        } catch (error) {
          console.error(`Error loading event ${file}:`, error);
        }
      }

      return eventCount;
    } catch (error) {
      throw new Error('Failed to load events: ' + error.message);
    }
  }
}

module.exports = { CommandHandler, EventHandler };
