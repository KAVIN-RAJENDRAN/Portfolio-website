import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Automated Asset Copying on startup
try {
  const brainDir = 'C:/Users/Admin/.gemini/antigravity/brain/afb66e23-0e78-46c8-8aab-e13c681edce6';
  const destDir = path.resolve(__dirname, './public/assets');
  if (fs.existsSync(brainDir)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const files = fs.readdirSync(brainDir);
    
    // Copy all files matching media__ prefix
    files.forEach((file) => {
      if (file.startsWith('media__')) {
        const srcPath = path.join(brainDir, file);
        const destPath = path.join(destDir, file);
        fs.copyFileSync(srcPath, destPath);
      }
    });

    // Explicit Mappings to ensure all references load successfully
    const mappings = [
      { src: 'media__1784828615666.pdf', dests: ['Kavin_Rajendran_Resume.pdf'] },
      { src: 'media__1784828555831.jpg', dests: ['kavin-profile.webp', 'kavin-profile.jpg'] },
      { src: 'media__1784830297535.jpg', dests: ['kavin-profile.webp', 'kavin-profile.jpg'] },
      { src: 'media__1784830297508.jpg', dests: ['renault-logo.webp', 'renault-logo.jpg'] },
      { src: 'media__1784830297511.jpg', dests: ['murugappa-logo.webp', 'murugappa-logo.jpg'] },
      { src: 'media__1784830297510.jpg', dests: ['srm-logo.webp', 'srm-logo.jpg'] },
      { src: 'media__1786788046033.pdf', dests: ['copilot-cert.pdf'] },
      { src: 'media__1784830297564.jpg', dests: [
        'microsoft-logo.webp', 'microsoft-logo.jpg',
        'deeplearning-logo.webp', 'deeplearning-logo.jpg',
        'ml-cert.webp', 'ml-cert.jpg'
      ]}
    ];

    mappings.forEach(({ src, dests }) => {
      const srcPath = path.join(brainDir, src);
      if (fs.existsSync(srcPath)) {
        dests.forEach((dest) => {
          const destPath = path.join(destDir, dest);
          fs.copyFileSync(srcPath, destPath);
        });
      }
    });
    console.log('[Antigravity] Successfully synced assets to public/assets/');
  }
} catch (err) {
  console.error('[Antigravity] Error syncing assets:', err);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
