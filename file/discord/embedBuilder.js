class EmbedBuilder {
  constructor() {
    this.data = {};
  }

  setTitle(title) {
    this.data.title = title;
    return this;
  }

  setDescription(description) {
    this.data.description = description;
    return this;
  }

  setColor(color) {
    if (typeof color === 'string') {
      this.data.color = parseInt(color.replace('#', ''), 16);
    } else {
      this.data.color = color;
    }
    return this;
  }

  setAuthor(name, iconURL, url) {
    this.data.author = { name };
    if (iconURL) this.data.author.icon_url = iconURL;
    if (url) this.data.author.url = url;
    return this;
  }

  setThumbnail(url) {
    this.data.thumbnail = { url };
    return this;
  }

  setImage(url) {
    this.data.image = { url };
    return this;
  }

  setFooter(text, iconURL) {
    this.data.footer = { text };
    if (iconURL) this.data.footer.icon_url = iconURL;
    return this;
  }

  setTimestamp(timestamp) {
    this.data.timestamp = timestamp || new Date().toISOString();
    return this;
  }

  addField(name, value, inline = false) {
    if (!this.data.fields) this.data.fields = [];
    this.data.fields.push({ name, value, inline });
    return this;
  }

  addFields(...fields) {
    if (!this.data.fields) this.data.fields = [];
    this.data.fields.push(...fields);
    return this;
  }

  setURL(url) {
    this.data.url = url;
    return this;
  }

  toJSON() {
    return this.data;
  }
}

module.exports = { EmbedBuilder };
