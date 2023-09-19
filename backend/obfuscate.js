const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const options = {
  // Configurações de obfuscação
  controlFlowFlattening: true,
  // compact: true,
  stringArray: true,
  rotateStringArray: true,
  transformObjectKeys: true,
  compact: false,
  controlFlowFlatteningThreshold: 1,
  numbersToExpressions: true,
  simplify: true,
  stringArrayShuffle: true,
  splitStrings: true,
  stringArrayThreshold: 1
};

const distFolder = './dist';

// Função para excluir arquivos .map
function deleteMapFiles (folderPath) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      deleteMapFiles(filePath);
    } else if (stats.isFile() && file.endsWith('.map')) {
      // Excluir o arquivo .map
      fs.unlinkSync(filePath);
    }
  });
}

// Função para percorrer e obfuscar arquivos
function obfuscateFolder (folderPath) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      obfuscateFolder(filePath);
    } else if (stats.isFile() && file.endsWith('.js')) {
      const originalCode = fs.readFileSync(filePath, 'utf-8');
      const obfuscatedCode = JavaScriptObfuscator.obfuscate(originalCode, options).getObfuscatedCode();

      fs.writeFileSync(filePath, obfuscatedCode);
      console.log(`Arquivo obfuscado: ${filePath}`);
    }

  });
}

// Executa a obfuscação na pasta dist
obfuscateFolder(distFolder);

// Excluir os arquivos .map para dificultar a leitura do código
deleteMapFiles(distFolder)
