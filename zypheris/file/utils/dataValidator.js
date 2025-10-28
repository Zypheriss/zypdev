class DataValidator {
  static isString(value) {
    return typeof value === 'string';
  }

  static isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  static isInteger(value) {
    return Number.isInteger(value);
  }

  static isBoolean(value) {
    return typeof value === 'boolean';
  }

  static isArray(value) {
    return Array.isArray(value);
  }

  static isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  static isFunction(value) {
    return typeof value === 'function';
  }

  static isNull(value) {
    return value === null;
  }

  static isUndefined(value) {
    return value === undefined;
  }

  static isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  static isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  static isUrl(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  static isIpAddress(value) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(value);
  }

  static isPort(value) {
    return this.isInteger(value) && value >= 0 && value <= 65535;
  }

  static isUuid(value) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  static isHexColor(value) {
    return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value);
  }

  static isAlpha(value) {
    return /^[a-zA-Z]+$/.test(value);
  }

  static isAlphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
  }

  static isNumeric(value) {
    return /^[0-9]+$/.test(value);
  }

  static isDate(value) {
    return value instanceof Date && !isNaN(value);
  }

  static isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  static isInRange(value, min, max) {
    return value >= min && value <= max;
  }

  static hasLength(value, length) {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length === length;
    }
    return false;
  }

  static hasMinLength(value, minLength) {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length >= minLength;
    }
    return false;
  }

  static hasMaxLength(value, maxLength) {
    if (typeof value === 'string' || Array.isArray(value)) {
      return value.length <= maxLength;
    }
    return false;
  }

  static matches(value, pattern) {
    if (typeof pattern === 'string') {
      pattern = new RegExp(pattern);
    }
    return pattern.test(value);
  }

  static isIn(value, array) {
    return array.includes(value);
  }

  static validate(value, rules) {
    const errors = [];

    if (rules.required && this.isEmpty(value)) {
      errors.push('Value is required');
    }

    if (rules.type) {
      const typeCheckers = {
        string: this.isString,
        number: this.isNumber,
        boolean: this.isBoolean,
        array: this.isArray,
        object: this.isObject,
        email: this.isEmail,
        url: this.isUrl
      };

      if (typeCheckers[rules.type] && !typeCheckers[rules.type](value)) {
        errors.push(`Value must be a ${rules.type}`);
      }
    }

    if (rules.minLength && !this.hasMinLength(value, rules.minLength)) {
      errors.push(`Value must be at least ${rules.minLength} characters`);
    }

    if (rules.maxLength && !this.hasMaxLength(value, rules.maxLength)) {
      errors.push(`Value must be at most ${rules.maxLength} characters`);
    }

    if (rules.min !== undefined && value < rules.min) {
      errors.push(`Value must be at least ${rules.min}`);
    }

    if (rules.max !== undefined && value > rules.max) {
      errors.push(`Value must be at most ${rules.max}`);
    }

    if (rules.pattern && !this.matches(value, rules.pattern)) {
      errors.push('Value does not match the required pattern');
    }

    if (rules.custom && typeof rules.custom === 'function') {
      const customError = rules.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

module.exports = { DataValidator };
