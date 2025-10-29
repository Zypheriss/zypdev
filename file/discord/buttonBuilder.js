class ButtonBuilder {
  constructor() {
    this.data = {
      type: 2
    };
  }

  setCustomId(customId) {
    this.data.custom_id = customId;
    return this;
  }

  setLabel(label) {
    this.data.label = label;
    return this;
  }

  setStyle(style) {
    const styles = {
      'PRIMARY': 1,
      'SECONDARY': 2,
      'SUCCESS': 3,
      'DANGER': 4,
      'LINK': 5
    };
    this.data.style = typeof style === 'string' ? styles[style] : style;
    return this;
  }

  setEmoji(emoji) {
    this.data.emoji = typeof emoji === 'string' ? { name: emoji } : emoji;
    return this;
  }

  setURL(url) {
    this.data.url = url;
    this.data.style = 5;
    return this;
  }

  setDisabled(disabled = true) {
    this.data.disabled = disabled;
    return this;
  }

  toJSON() {
    return this.data;
  }
}

class SelectMenuBuilder {
  constructor() {
    this.data = {
      type: 3,
      options: []
    };
  }

  setCustomId(customId) {
    this.data.custom_id = customId;
    return this;
  }

  setPlaceholder(placeholder) {
    this.data.placeholder = placeholder;
    return this;
  }

  setMinValues(min) {
    this.data.min_values = min;
    return this;
  }

  setMaxValues(max) {
    this.data.max_values = max;
    return this;
  }

  addOption(label, value, description, emoji, isDefault = false) {
    const option = { label, value };
    if (description) option.description = description;
    if (emoji) option.emoji = typeof emoji === 'string' ? { name: emoji } : emoji;
    if (isDefault) option.default = true;
    this.data.options.push(option);
    return this;
  }

  addOptions(...options) {
    this.data.options.push(...options);
    return this;
  }

  setDisabled(disabled = true) {
    this.data.disabled = disabled;
    return this;
  }

  toJSON() {
    return this.data;
  }
}

class ActionRowBuilder {
  constructor() {
    this.data = {
      type: 1,
      components: []
    };
  }

  addComponents(...components) {
    this.data.components.push(...components.map(c => c.toJSON ? c.toJSON() : c));
    return this;
  }

  toJSON() {
    return this.data;
  }
}

module.exports = { ButtonBuilder, SelectMenuBuilder, ActionRowBuilder };
