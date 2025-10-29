const axios = require('axios');
const fs = require('fs');
const path = require('path');

class WebhookLogger {
  constructor(webhookUrl, options = {}) {
    this.webhookUrl = webhookUrl;
    this.username = options.username || 'ZypDev Logger';
    this.avatarUrl = options.avatarUrl || null;
    this.colors = {
      info: 0x3498db,
      success: 0x2ecc71,
      warning: 0xf39c12,
      error: 0xe74c3c,
      debug: 0x9b59b6
    };
  }

  async send(message, type = 'info') {
    try {
      const embed = {
        description: message,
        color: this.colors[type] || this.colors.info,
        timestamp: new Date().toISOString(),
        footer: {
          text: type.toUpperCase()
        }
      };

      const payload = {
        username: this.username,
        embeds: [embed]
      };

      if (this.avatarUrl) {
        payload.avatar_url = this.avatarUrl;
      }

      await axios.post(this.webhookUrl, payload);
      return { success: true };
    } catch (error) {
      console.error('Failed to send webhook:', error.message);
      return { success: false, error: error.message };
    }
  }

  async info(message) {
    return await this.send(message, 'info');
  }

  async success(message) {
    return await this.send(message, 'success');
  }

  async warning(message) {
    return await this.send(message, 'warning');
  }

  async error(message) {
    return await this.send(message, 'error');
  }

  async debug(message) {
    return await this.send(message, 'debug');
  }

  async sendEmbed(embed) {
    try {
      const payload = {
        username: this.username,
        embeds: [embed]
      };

      if (this.avatarUrl) {
        payload.avatar_url = this.avatarUrl;
      }

      await axios.post(this.webhookUrl, payload);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = { WebhookLogger };
