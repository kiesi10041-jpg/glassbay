const fs=require('fs'),path=require('path'),crypto=require('crypto');
const manifest=JSON.parse(fs.readFileSync('ASSET_MANIFEST.json','utf8'));
for(const entry of manifest){if(!fs.existsSync(entry.path))throw Error('Missing '+entry.path);const b=fs.readFileSync(entry.path);if(b.length!==entry.bytes||crypto.createHash('sha256').update(b).digest('hex')!==entry.sha256)throw Error('Changed '+entry.path)}
console.log('PASS all packaged assets exist and match their checksums');
const html=fs.readFileSync('index.html','utf8');for(const m of html.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^\"]*)?"/g)){if(!/^(?:https?:|data:|#)/.test(m[1])&&!fs.existsSync(m[1]))throw Error('Missing entry file '+m[1])}
console.log('PASS every entry script, stylesheet and atlas probe resolves in the complete package');
for(const file of ['data.js','game.js','story.js','identity.js','infection.js','cast.js','ui.js']){if(!fs.readFileSync(file,'utf8').includes("='5.24'"))throw Error('Mixed version '+file)}
console.log('PASS all runtime scripts belong to the same release');
