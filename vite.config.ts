import { defineConfig } from 'vite';

const entryFileNames = (chunkInfo: { name: string; }) => {
  if(chunkInfo.name === 'sw') {
    return '[name].js';
  }

  return 'assets/scripts/[name].js';
};

export default defineConfig({
  base: '/',
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