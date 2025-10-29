const fs = require('fs');
const path = require('path');

function analyzeModuleUsage() {
  try {
    const projectRoot = process.cwd();
    const packageJsonPath = path.join(projectRoot, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found in project root');
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});
    const devDependencies = Object.keys(packageJson.devDependencies || {});
    
    const allDependencies = [...dependencies, ...devDependencies];
    const usedModules = [];
    const unusedModules = [];

    function scanDirectory(dir) {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && file !== 'node_modules' && !file.startsWith('.')) {
          scanDirectory(filePath);
        } else if (file.endsWith('.js') || file.endsWith('.ts')) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          allDependencies.forEach(dep => {
            const requirePattern = new RegExp(`require\\(['"]${dep}['"]\\)`, 'g');
            const importPattern = new RegExp(`from\\s+['"]${dep}['"]`, 'g');
            
            if (requirePattern.test(content) || importPattern.test(content)) {
              if (!usedModules.includes(dep)) {
                usedModules.push(dep);
              }
            }
          });
        }
      });
    }

    scanDirectory(projectRoot);

    allDependencies.forEach(dep => {
      if (!usedModules.includes(dep)) {
        unusedModules.push(dep);
      }
    });

    const hiddenModules = dependencies.filter(dep => !usedModules.includes(dep) && !unusedModules.includes(dep));
    const hiddenUnusedModules = devDependencies.filter(dep => !usedModules.includes(dep));

    return {
      usedModules,
      hiddenModules,
      unusedModules,
      hiddenUnusedModules
    };
  } catch (error) {
    throw new Error('Failed to analyze module usage: ' + error.message);
  }
}

module.exports = { analyzeModuleUsage };
