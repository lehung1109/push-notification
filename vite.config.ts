import { defineConfig } from 'vite';
import { loadEnv } from 'vite';

const argvModeIndex = process.argv.indexOf('--mode');
const mode = argvModeIndex >= 0 && argvModeIndex < process.argv.length - 1 && !process.argv[argvModeIndex + 1].startsWith('-') ? process.argv[argvModeIndex + 1] : 'production';

const env = loadEnv(mode, __dirname);

const entryFileNames = (chunkInfo: { name: string; }) => {
  if(chunkInfo.name === 'sw') {
    return '[name].js';
  }

  return 'assets/scripts/[name].js';
};

export default defineConfig({
  base: `${env.VITE_BASE_URL}`,
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: [
        'index.html',
        'src/assets/scripts/sw.ts'
      ],
      output: {
        entryFileNames,
      }
    }
  },
});