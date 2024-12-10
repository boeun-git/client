/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // 적절히 설정하세요. 예를 들어 src 폴더 내 모든 파일을 처리하도록 설정
    './node_modules/flowbite/**/*.js', // flowbite 관련 파일도 포함되도록 설정
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite 플러그인도 포함해야 합니다.
  ],
};
