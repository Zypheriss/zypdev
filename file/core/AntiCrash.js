const axios = require('axios');

class AntiCrash {
  constructor(options = {}) {
    this.webhookUrl = options.url || null;
    this.showConsole = true;
    this.showWebhook = false;
  }

  setHide(target = 'all') {
    if (target === 'console' || target === 'all') {
      this.showConsole = false;
    }
    if (target === 'webhook' || target === 'all') {
      this.showWebhook = false;
    }
    return this;
  }

  setShow(target = 'all') {
    if (target === 'console' || target === 'all') {
      this.showConsole = true;
    }
    if (target === 'webhook' || target === 'all') {
      this.showWebhook = true;
    }
    return this;
  }

  start() {
    process.on('unhandledRejection', (reason, promise) => {
      this.handleError('Unhandled Rejection', reason, promise);
    });

    process.on('uncaughtException', (error, origin) => {
      this.handleError('Uncaught Exception', error, origin);
    });

    process.on('uncaughtExceptionMonitor', (error, origin) => {
      this.handleError('Uncaught Exception Monitor', error, origin);
    });

    process.on('warning', (warning) => {
      this.handleError('Process Warning', warning);
    });

    return this;
  }

  async handleError(type, error, extra) {
    const errorMessage = error?.stack || error?.message || error;
    const timestamp = new Date().toISOString();

    if (this.showConsole) {
      console.error(`[${timestamp}] ${type}:`, errorMessage);
    }

    if (this.showWebhook && this.webhookUrl) {
      try {
        await axios.post(this.webhookUrl, {
          embeds: [{
            title: ` ${type}`,
            description: `\`\`\`js\n${errorMessage}\`\`\``,
            color: 0xFF0000,
            timestamp: timestamp,
            footer: { text: 'ZypDev AntiCrash System' }
          }]
        });
      } catch (webhookError) {
        console.error('Failed to send error to webhook:', webhookError.message);
      }
    }
  }
}

module.exports = { AntiCrash };
