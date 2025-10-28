declare module 'zypdev' {
  export const version: string;

  export function calculate(value: number, value2: number): number;
  export function random(min: number, max: number): number;
  export function shortNumber(number: number, locale?: string): string;
  export function formatNumber(number: number): string;
  export function timestamp(time: number): number;
  export function ms(value: string | number, options?: MSOptions): string | number;
  export function generatePassword(options: PasswordOptions): string;
  export function generateCode(options: CodeOptions): string;

  export interface MSOptions {
    short?: boolean;
    lang?: 'en' | 'tr';
    largest?: number;
    units?: string[];
  }

  export interface PasswordOptions {
    length?: number;
    numbers?: boolean;
    symbols?: boolean | string;
    lowercase?: boolean;
    uppercase?: boolean;
    excludeSimilarCharacters?: boolean;
    allLowercase?: boolean;
    allUppercase?: boolean;
  }

  export interface CodeOptions {
    length?: number;
    range?: number;
    numbers?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    excludeSimilarCharacters?: boolean;
    symbol?: string;
    allLowercase?: boolean;
    allUppercase?: boolean;
  }

  export class AntiCrash {
    constructor(options?: { url?: string });
    setHide(target?: 'console' | 'webhook' | 'all'): this;
    setShow(target?: 'console' | 'webhook' | 'all'): this;
    start(): this;
  }

  export function analyzeModuleUsage(): {
    usedModules: string[];
    hiddenModules: string[];
    unusedModules: string[];
    hiddenUnusedModules: string[];
  };

  export class Logger {
    constructor(options?: { showTimestamp?: boolean; prefix?: string });
    success(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    log(message: string): void;
  }

  export function showBanner(customText?: string): void;

  export class CommandHandler {
    constructor(client: any, options?: { commandsPath?: string; prefix?: string });
    loadCommands(): Promise<number>;
    handleMessage(message: any): Promise<void>;
    getCommand(name: string): any;
    getAllCommands(): any[];
  }

  export class EventHandler {
    constructor(client: any, options?: { eventsPath?: string });
    loadEvents(): Promise<number>;
  }

  export class EmbedBuilder {
    setTitle(title: string): this;
    setDescription(description: string): this;
    setColor(color: string | number): this;
    setAuthor(name: string, iconURL?: string, url?: string): this;
    setThumbnail(url: string): this;
    setImage(url: string): this;
    setFooter(text: string, iconURL?: string): this;
    setTimestamp(timestamp?: string): this;
    addField(name: string, value: string, inline?: boolean): this;
    addFields(...fields: any[]): this;
    setURL(url: string): this;
    toJSON(): any;
  }

  export class ButtonBuilder {
    setCustomId(customId: string): this;
    setLabel(label: string): this;
    setStyle(style: 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER' | 'LINK' | number): this;
    setEmoji(emoji: string | any): this;
    setURL(url: string): this;
    setDisabled(disabled?: boolean): this;
    toJSON(): any;
  }

  export class SelectMenuBuilder {
    setCustomId(customId: string): this;
    setPlaceholder(placeholder: string): this;
    setMinValues(min: number): this;
    setMaxValues(max: number): this;
    addOption(label: string, value: string, description?: string, emoji?: string | any, isDefault?: boolean): this;
    addOptions(...options: any[]): this;
    setDisabled(disabled?: boolean): this;
    toJSON(): any;
  }

  export class ActionRowBuilder {
    addComponents(...components: any[]): this;
    toJSON(): any;
  }

  export class PermissionChecker {
    hasPermission(member: any, permission: string | number): boolean;
    hasPermissions(member: any, permissions: (string | number)[]): boolean;
    hasAnyPermission(member: any, permissions: (string | number)[]): boolean;
    checkChannelPermission(member: any, channel: any, permission: string | number): boolean;
    getMissingPermissions(member: any, requiredPermissions: (string | number)[]): (string | number)[];
  }

  export class Pagination {
    constructor(options?: { pages?: any[]; timeout?: number; customButtons?: any });
    addPage(embed: any): this;
    addPages(...embeds: any[]): this;
    paginate(message: any, author: any): Promise<any>;
  }

  export class StringUtils {
    static capitalize(str: string): string;
    static capitalizeWords(str: string): string;
    static reverse(str: string): string;
    static truncate(str: string, length: number, ending?: string): string;
    static slugify(str: string): string;
    static camelCase(str: string): string;
    static snakeCase(str: string): string;
    static kebabCase(str: string): string;
    static removeWhitespace(str: string): string;
    static countWords(str: string): number;
    static isPalindrome(str: string): boolean;
    static repeat(str: string, count: number): string;
    static escapeHtml(str: string): string;
    static unescapeHtml(str: string): string;
    static isValidEmail(str: string): boolean;
    static isValidUrl(str: string): boolean;
  }

  export class ArrayUtils {
    static shuffle<T>(array: T[]): T[];
    static unique<T>(array: T[]): T[];
    static chunk<T>(array: T[], size: number): T[][];
    static flatten<T>(array: any[], depth?: number): T[];
    static compact<T>(array: T[]): T[];
    static difference<T>(array1: T[], array2: T[]): T[];
    static intersection<T>(array1: T[], array2: T[]): T[];
    static union<T>(...arrays: T[][]): T[];
    static partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]];
    static groupBy<T>(array: T[], key: string | ((item: T) => any)): { [key: string]: T[] };
    static countBy<T>(array: T[], key: string | ((item: T) => any)): { [key: string]: number };
    static sortBy<T>(array: T[], key: string | ((item: T) => any), order?: 'asc' | 'desc'): T[];
    static sample<T>(array: T[]): T;
    static sampleSize<T>(array: T[], n: number): T[];
    static take<T>(array: T[], n?: number): T[];
    static takeLast<T>(array: T[], n?: number): T[];
    static sum(array: number[]): number;
    static average(array: number[]): number;
    static min(array: number[]): number;
    static max(array: number[]): number;
  }

  export class ObjectUtils {
    static deepClone<T>(obj: T): T;
    static merge<T>(...objects: Partial<T>[]): T;
    static deepMerge<T>(target: T, ...sources: Partial<T>[]): T;
    static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
    static omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
    static isEmpty(obj: any): boolean;
    static isObject(item: any): boolean;
    static isEqual(obj1: any, obj2: any): boolean;
    static flatten(obj: any, prefix?: string): { [key: string]: any };
    static unflatten(obj: { [key: string]: any }): any;
    static getPath(obj: any, path: string, defaultValue?: any): any;
    static setPath(obj: any, path: string, value: any): any;
  }

  export class ColorUtils {
    static hexToRgb(hex: string): { r: number; g: number; b: number } | null;
    static rgbToHex(r: number, g: number, b: number): string;
    static hexToInt(hex: string): number;
    static intToHex(int: number): string;
    static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number };
    static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number };
    static lighten(hex: string, percent: number): string;
    static darken(hex: string, percent: number): string;
    static randomHex(): string;
    static isValidHex(hex: string): boolean;
  }

  export class DataValidator {
    static isString(value: any): boolean;
    static isNumber(value: any): boolean;
    static isInteger(value: any): boolean;
    static isBoolean(value: any): boolean;
    static isArray(value: any): boolean;
    static isObject(value: any): boolean;
    static isFunction(value: any): boolean;
    static isNull(value: any): boolean;
    static isUndefined(value: any): boolean;
    static isEmpty(value: any): boolean;
    static isEmail(value: string): boolean;
    static isUrl(value: string): boolean;
    static isIpAddress(value: string): boolean;
    static isPort(value: number): boolean;
    static isUuid(value: string): boolean;
    static isHexColor(value: string): boolean;
    static isAlpha(value: string): boolean;
    static isAlphanumeric(value: string): boolean;
    static isNumeric(value: string): boolean;
    static isDate(value: any): boolean;
    static isValidDate(dateString: string): boolean;
    static isInRange(value: number, min: number, max: number): boolean;
    static hasLength(value: string | any[], length: number): boolean;
    static hasMinLength(value: string | any[], minLength: number): boolean;
    static hasMaxLength(value: string | any[], maxLength: number): boolean;
    static matches(value: string, pattern: string | RegExp): boolean;
    static isIn(value: any, array: any[]): boolean;
    static validate(value: any, rules: ValidationRules): { valid: boolean; errors: string[] };
  }

  export interface ValidationRules {
    required?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url';
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string | RegExp;
    custom?: (value: any) => string | null;
  }

  export class CooldownManager {
    setCooldown(userId: string, commandName: string, duration: number): void;
    getCooldown(userId: string, commandName: string): number | null;
    hasCooldown(userId: string, commandName: string): boolean;
    getRemainingTime(userId: string, commandName: string): number;
    removeCooldown(userId: string, commandName: string): void;
    clearUserCooldowns(userId: string): void;
    clearCommandCooldowns(commandName: string): void;
    clearAllCooldowns(): void;
    getAllCooldowns(userId: string): { [commandName: string]: number };
  }

  export class ConfigManager {
    constructor(configPath?: string);
    load(): boolean;
    save(): boolean;
    get(key: string, defaultValue?: any): any;
    set(key: string, value: any): void;
    has(key: string): boolean;
    delete(key: string): boolean;
    reset(): void;
    getAll(): any;
    watch(key: string, callback: (key: string, value: any) => void): void;
    merge(data: any): void;
  }

  export class BackupSystem {
    constructor(options?: {
      sourcePath?: string;
      backupPath?: string;
      maxBackups?: number;
      autoBackup?: boolean;
      backupInterval?: number;
    });
    createBackup(customName?: string): { success: boolean; backupName?: string; backupPath?: string; timestamp?: Date; error?: string };
    restoreBackup(backupName: string): { success: boolean; restoredFrom?: string; error?: string };
    listBackups(): Array<{ name: string; created: Date; size: number }>;
    deleteBackup(backupName: string): { success: boolean; error?: string };
    startAutoBackup(): { success: boolean; error?: string };
    stopAutoBackup(): { success: boolean; error?: string };
  }

  export class WebhookLogger {
    constructor(webhookUrl: string, options?: { username?: string; avatarUrl?: string });
    send(message: string, type?: 'info' | 'success' | 'warning' | 'error' | 'debug'): Promise<{ success: boolean; error?: string }>;
    info(message: string): Promise<{ success: boolean; error?: string }>;
    success(message: string): Promise<{ success: boolean; error?: string }>;
    warning(message: string): Promise<{ success: boolean; error?: string }>;
    error(message: string): Promise<{ success: boolean; error?: string }>;
    debug(message: string): Promise<{ success: boolean; error?: string }>;
    sendEmbed(embed: any): Promise<{ success: boolean; error?: string }>;
  }

  export class AdvancedLogger {
    constructor(options?: {
      logDir?: string;
      logFile?: string;
      maxFileSize?: number;
      maxFiles?: number;
      logToConsole?: boolean;
      logLevel?: 'debug' | 'info' | 'warn' | 'error';
    });
    debug(message: string, meta?: any): void;
    info(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    clearLogs(): { success: boolean; error?: string };
    getLogs(count?: number): string[];
  }
}
