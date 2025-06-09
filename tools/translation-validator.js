





import fs from 'fs';
import path from 'path';

export class TranslationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validateTranslationFile(filePath) {
    this.errors = [];
    this.warnings = [];

    if (!fs.existsSync(filePath)) {
      this.errors.push(`Translation file not found: ${filePath}`);
      return false;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const translations = JSON.parse(content);
      
      this.validateStructure(translations, filePath);
      this.validateKeys(translations);
      this.validateValues(translations);
      
      return this.errors.length === 0;
    } catch (error) {
      this.errors.push(`Invalid JSON in ${filePath}: ${error.message}`);
      return false;
    }
  }

  validateStructure(translations, filePath) {
    if (typeof translations !== 'object' || translations === null) {
      this.errors.push(`Root element must be an object in ${filePath}`);
      return;
    }

    if (Array.isArray(translations)) {
      this.errors.push(`Root element cannot be an array in ${filePath}`);
    }
  }

  validateKeys(translations, prefix = '') {
    for (const key in translations) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof key !== 'string') {
        this.errors.push(`Invalid key type: ${fullKey} must be a string`);
        continue;
      }

      if (key.trim() === '') {
        this.errors.push(`Empty key found at: ${fullKey}`);
        continue;
      }

      if (key.includes(' ')) {
        this.warnings.push(`Key contains spaces: ${fullKey}`);
      }

      if (typeof translations[key] === 'object' && translations[key] !== null) {
        this.validateKeys(translations[key], fullKey);
      }
    }
  }

  validateValues(translations, prefix = '') {
    for (const key in translations) {
      const value = translations[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (value === null || value === undefined) {
        this.errors.push(`Null or undefined value at: ${fullKey}`);
        continue;
      }

      if (typeof value === 'string') {
        this.validateStringValue(value, fullKey);
      } else if (typeof value === 'object') {
        this.validateValues(value, fullKey);
      } else {
        this.warnings.push(`Non-string value at: ${fullKey} (type: ${typeof value})`);
      }
    }
  }

  validateStringValue(value, key) {
    if (value.trim() === '') {
      this.warnings.push(`Empty string value at: ${key}`);
    }

    // Check for placeholder consistency
    const placeholders = value.match(/\{\{[^}]+\}\}/g) || [];
    const uniquePlaceholders = [...new Set(placeholders)];
    
    if (placeholders.length !== uniquePlaceholders.length) {
      this.warnings.push(`Duplicate placeholders in: ${key}`);
    }

    // Check for unclosed placeholders
    const openBraces = (value.match(/\{\{/g) || []).length;
    const closeBraces = (value.match(/\}\}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      this.errors.push(`Unclosed placeholder braces in: ${key}`);
    }
  }

  validateDirectory(dirPath, baseLanguage = 'en') {
    if (!fs.existsSync(dirPath)) {
      this.errors.push(`Translation directory not found: ${dirPath}`);
      return false;
    }

    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(dirPath, file));

    if (files.length === 0) {
      this.errors.push(`No translation files found in: ${dirPath}`);
      return false;
    }

    const baseFile = files.find(file => 
      path.basename(file, '.json') === baseLanguage
    );

    if (!baseFile) {
      this.warnings.push(`Base language file (${baseLanguage}.json) not found`);
    }

    let allValid = true;
    const translationData = {};

    // Validate each file
    for (const file of files) {
      const isValid = this.validateTranslationFile(file);
      if (!isValid) allValid = false;

      if (isValid) {
        const lang = path.basename(file, '.json');
        const content = fs.readFileSync(file, 'utf8');
        translationData[lang] = JSON.parse(content);
      }
    }

    // Cross-validate keys between languages
    if (baseFile && translationData[baseLanguage]) {
      this.crossValidateKeys(translationData, baseLanguage);
    }

    return allValid;
  }

  crossValidateKeys(translationData, baseLanguage) {
    const baseKeys = this.getAllKeys(translationData[baseLanguage]);
    
    for (const lang in translationData) {
      if (lang === baseLanguage) continue;
      
      const langKeys = this.getAllKeys(translationData[lang]);
      
      // Find missing keys
      const missingKeys = baseKeys.filter(key => !langKeys.includes(key));
      const extraKeys = langKeys.filter(key => !baseKeys.includes(key));
      
      if (missingKeys.length > 0) {
        this.warnings.push(`Missing keys in ${lang}.json: ${missingKeys.join(', ')}`);
      }
      
      if (extraKeys.length > 0) {
        this.warnings.push(`Extra keys in ${lang}.json: ${extraKeys.join(', ')}`);
      }
    }
  }

  getAllKeys(obj, prefix = '') {
    let keys = [];
    
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(this.getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  }

  getReport() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        errorCount: this.errors.length,
        warningCount: this.warnings.length
      }
    };
  }

  printReport() {
    const report = this.getReport();
    
    console.log('\n=== Translation Validation Report ===');
    console.log(`Status: ${report.valid ? 'VALID' : 'INVALID'}`);
    console.log(`Errors: ${report.summary.errorCount}`);
    console.log(`Warnings: ${report.summary.warningCount}`);
    
    if (report.errors.length > 0) {
      console.log('\nErrors:');
      report.errors.forEach(error => console.log(`  ❌ ${error}`));
    }
    
    if (report.warnings.length > 0) {
      console.log('\nWarnings:');
      report.warnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
    }
    
    console.log('=====================================\n');
  }
}

export default TranslationValidator;


