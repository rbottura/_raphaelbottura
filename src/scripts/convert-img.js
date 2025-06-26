// convert-bg-img.js
import sharp from 'sharp';
import fg from 'fast-glob';
import path from 'path';
import fs from 'fs/promises';

const MAX_WIDTH = 300;
const QUALITY = 80;

// 👇 adjust this path if you're running the script from another location
const ROOT_MEDIA_DIR = path.resolve('./public/medias');

const processImage = async (inputPath) => {
    const dir = path.dirname(inputPath);
    const outputPath = path.join(dir, 'bg-img.webp');

    try {
        await sharp(inputPath)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({
                quality: QUALITY,
                effort: 6,
                chromaSubsampling: '4:4:4'
            })
            .toFile(outputPath);
        console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
    } catch (err) {
        console.error(`❌ Failed to process ${inputPath}: ${err.message}`);
    }
};

const run = async () => {
    try {
        console.log('🔍 Searching for files...');
        console.log('🗂 Root media dir:', ROOT_MEDIA_DIR);

        const pattern = '**/bg-img.png';
        console.log('🔎 Pattern:', pattern);

        const files = await fg(pattern, {
            cwd: ROOT_MEDIA_DIR,
            onlyFiles: true,
            absolute: true,
        });

        console.log(`📄 Found ${files.length} file(s).`);

        if (files.length === 0) {
            return console.log('⚠️ No bg-img.png files found.');
        }

        await Promise.all(files.map(processImage));
    } catch (err) {
        console.error('❌ Error during image search or processing:', err.message);
    }
};

run();
