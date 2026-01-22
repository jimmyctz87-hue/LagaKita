import sharp from 'sharp';
import { join } from 'path';

async function convertBanner() {
    const inputPath = join(process.cwd(), 'public', 'banner1_lagakita.png');
    const outputPath = join(process.cwd(), 'public', 'banner1_lagakita.webp');

    try {
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);

        console.log('✅ Banner converted successfully to WebP (80% quality)');
        console.log(`Output: ${outputPath}`);
    } catch (error) {
        console.error('❌ Error converting banner:', error);
    }
}

convertBanner();
