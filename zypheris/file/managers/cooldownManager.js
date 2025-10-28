class CooldownManager {
  constructor() {
    this.cooldowns = new Map();
  }

  setCooldown(userId, commandName, duration) {
    if (!this.cooldowns.has(commandName)) {
      this.cooldowns.set(commandName, new Map());
    }

    const now = Date.now();
    const expirationTime = now + duration;

    this.cooldowns.get(commandName).set(userId, expirationTime);

    setTimeout(() => {
      this.removeCooldown(userId, commandName);
    }, duration);
  }

  getCooldown(userId, commandName) {
    if (!this.cooldowns.has(commandName)) {
      return null;
    }

    const userCooldown = this.cooldowns.get(commandName).get(userId);
    if (!userCooldown) {
      return null;
    }

    const now = Date.now();
    if (now >= userCooldown) {
      this.removeCooldown(userId, commandName);
      return null;
    }

    return userCooldown - now;
  }

  hasCooldown(userId, commandName) {
    return this.getCooldown(userId, commandName) !== null;
  }

  getRemainingTime(userId, commandName) {
    const remaining = this.getCooldown(userId, commandName);
    if (remaining === null) return 0;
    return Math.ceil(remaining / 1000);
  }

  removeCooldown(userId, commandName) {
    if (this.cooldowns.has(commandName)) {
      this.cooldowns.get(commandName).delete(userId);
    }
  }

  clearUserCooldowns(userId) {
    for (const [commandName, users] of this.cooldowns.entries()) {
      users.delete(userId);
    }
  }

  clearCommandCooldowns(commandName) {
    if (this.cooldowns.has(commandName)) {
      this.cooldowns.delete(commandName);
    }
  }

  clearAllCooldowns() {
    this.cooldowns.clear();
  }

  getAllCooldowns(userId) {
    const userCooldowns = {};
    
    for (const [commandName, users] of this.cooldowns.entries()) {
      const cooldown = users.get(userId);
      if (cooldown && Date.now() < cooldown) {
        userCooldowns[commandName] = cooldown - Date.now();
      }
    }

    return userCooldowns;
  }
}

module.exports = { CooldownManager };
