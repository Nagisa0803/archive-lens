import {readdir,readFile,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url)),output=path.join(root,'public');
await mkdir(output,{recursive:true});const seen=new Set();
for(const file of (await readdir(path.join(root,'assets'))).filter(n=>/^generic-(wardrobe|card)-\d{3}\.json$/.test(n)).sort()){const pack=JSON.parse(await readFile(path.join(root,'assets',file),'utf8'));const kind=pack.format==='generic-card-images/v1'?'cards':pack.format==='generic-wardrobe-images/v1'?'wardrobe':null;if(!kind||!Array.isArray(pack.images))throw Error('Invalid generic image source');for(const image of pack.images){if(!/^[a-f0-9]{64}\.webp$/.test(image.name)||seen.has(image.name))throw Error('Invalid or repeated image name');const data=Buffer.from(image.base64,'base64');if(data.length>24*1024*1024||data.subarray(0,4).toString()!=='RIFF'||data.subarray(8,12).toString()!=='WEBP'||createHash('sha256').update(data).digest('hex')!==image.sha256)throw Error('Invalid generic WebP source');await mkdir(path.join(output,kind,'images'),{recursive:true});await writeFile(path.join(output,kind,'images',image.name),data);seen.add(image.name)}}
if(!seen.size)throw Error('No generic image source found');console.log(`Restored ${seen.size} generic wardrobe/card thumbnails.`);
