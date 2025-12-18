import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // GitHub Pages용 베이스 경로 설정 (리포지토리 이름)
    base: '/neocate/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    // GitHub Pages에서 main 브랜치의 docs 폴더를 바로 쓸 수 있도록 빌드 출력 경로를 docs 로 변경
    build: {
      outDir: 'docs',
    },

    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
