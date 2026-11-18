const fs = require('fs');
const path = require('path');
const https = require('https');

const srcDir = path.join(__dirname, 'frontend', 'src');
const componentsDir = path.join(srcDir, 'components');
const pagesDir = path.join(srcDir, 'pages');

const files = [
  path.join(componentsDir, 'LoginModal.js'),
  path.join(componentsDir, 'ApiSettingsModal.js'),
  path.join(componentsDir, 'Header.js'),
  path.join(componentsDir, 'PlaceCard.js'),
  path.join(pagesDir, 'Home.js'),
  path.join(srcDir, 'App.js')
];

function getUrl(url, cb) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      const redirectUrl = res.headers.location.startsWith('http') 
        ? res.headers.location 
        : 'https://unpkg.com' + res.headers.location;
      return getUrl(redirectUrl, cb);
    }
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => cb(null, body));
  }).on('error', cb);
}

getUrl('https://unpkg.com/@babel/standalone/babel.min.js', (err, babelSource) => {
  if (err) return console.error('Error:', err);
  console.log('Babel loaded, compiling files with classic runtime...');

  const vm = require('vm');
  const sandbox = { window: {}, console: console, process: process };
  vm.createContext(sandbox);
  vm.runInContext(babelSource, sandbox);
  const Babel = sandbox.Babel || sandbox.window.Babel;

  let bundledOutput = '// CityPulse Pre-compiled Application Bundle (Classic UMD)\n';
  bundledOutput += 'var React = window.React;\nvar ReactDOM = window.ReactDOM;\n';

  files.forEach(f => {
    const rawCode = fs.readFileSync(f, 'utf8');
    const wrapped = `(function() {\n${rawCode}\n})();`;
    const compiled = Babel.transform(wrapped, {
      presets: [['react', { runtime: 'classic' }]]
    }).code;
    bundledOutput += `\n// --- ${path.basename(f)} ---\n` + compiled + '\n';
  });

  const outPath = path.join(srcDir, 'app.bundle.js');
  fs.writeFileSync(outPath, bundledOutput, 'utf8');
  console.log('Successfully generated clean frontend/src/app.bundle.js! Size:', bundledOutput.length);
  process.exit(0);
});
