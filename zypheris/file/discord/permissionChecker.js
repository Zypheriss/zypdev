class PermissionChecker {
  constructor() {
    this.permissions = {
      ADMINISTRATOR: 0x8,
      MANAGE_GUILD: 0x20,
      MANAGE_ROLES: 0x10000000,
      MANAGE_CHANNELS: 0x10,
      KICK_MEMBERS: 0x2,
      BAN_MEMBERS: 0x4,
      MANAGE_MESSAGES: 0x2000,
      MANAGE_WEBHOOKS: 0x20000000,
      MANAGE_EMOJIS: 0x40000000,
      VIEW_AUDIT_LOG: 0x80,
      VIEW_CHANNEL: 0x400,
      SEND_MESSAGES: 0x800,
      EMBED_LINKS: 0x4000,
      ATTACH_FILES: 0x8000,
      READ_MESSAGE_HISTORY: 0x10000,
      MENTION_EVERYONE: 0x20000,
      USE_EXTERNAL_EMOJIS: 0x40000,
      ADD_REACTIONS: 0x40,
      CONNECT: 0x100000,
      SPEAK: 0x200000,
      MUTE_MEMBERS: 0x400000,
      DEAFEN_MEMBERS: 0x800000,
      MOVE_MEMBERS: 0x1000000
    };
  }

  hasPermission(member, permission) {
    if (!member || !member.permissions) return false;
    
    const permValue = typeof permission === 'string' 
      ? this.permissions[permission] 
      : permission;
    
    if (member.permissions.has('ADMINISTRATOR')) return true;
    
    return member.permissions.has(permValue);
  }

  hasPermissions(member, permissions) {
    return permissions.every(perm => this.hasPermission(member, perm));
  }

  hasAnyPermission(member, permissions) {
    return permissions.some(perm => this.hasPermission(member, perm));
  }

  checkChannelPermission(member, channel, permission) {
    if (!channel || !channel.permissionsFor) return false;
    
    const permissions = channel.permissionsFor(member);
    if (!permissions) return false;
    
    if (permissions.has('ADMINISTRATOR')) return true;
    
    return permissions.has(permission);
  }

  getMissingPermissions(member, requiredPermissions) {
    return requiredPermissions.filter(perm => !this.hasPermission(member, perm));
  }
}

module.exports = { PermissionChecker };
