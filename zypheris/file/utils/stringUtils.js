class StringUtils {
  static capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  static capitalizeWords(str) {
    if (!str) return '';
    return str.split(' ').map(word => this.capitalize(word)).join(' ');
  }

  static reverse(str) {
    if (!str) return '';
    return str.split('').reverse().join('');
  }

  static truncate(str, length, ending = '...') {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length - ending.length) + ending;
  }

  static slugify(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static camelCase(str) {
    if (!str) return '';
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  static snakeCase(str) {
    if (!str) return '';
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  }

  static kebabCase(str) {
    if (!str) return '';
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
  }

  static removeWhitespace(str) {
    if (!str) return '';
    return str.replace(/\s+/g, '');
  }

  static countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).length;
  }

  static isPalindrome(str) {
    if (!str) return false;
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }

  static repeat(str, count) {
    if (!str || count < 1) return '';
    return str.repeat(count);
  }

  static escapeHtml(str) {
    if (!str) return '';
    const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, char => htmlEscapes[char]);
  }

  static unescapeHtml(str) {
    if (!str) return '';
    const htmlUnescapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    };
    return str.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => htmlUnescapes[entity]);
  }

  static isValidEmail(str) {
    if (!str) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }

  static isValidUrl(str) {
    if (!str) return false;
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { StringUtils };
