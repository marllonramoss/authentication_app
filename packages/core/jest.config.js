module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
     testMatch: ['**/tests/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // Inclui a pasta "tests", Localiza testes nas pastas certas
    moduleFileExtensions: ['ts', 'js'], // Permite carregar arquivos TypeScript e JavaScript
    collectCoverage: true, // Gera relatório de cobertura de testes
    coverageDirectory: 'coverage', // Diretório para salvar relatórios de cobertura
    coverageProvider: 'v8', // Método para calcular cobertura
};
