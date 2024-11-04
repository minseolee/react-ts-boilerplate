const path = require('path');

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// API 요청을 위한 프록시 설정
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    // secure: true
}));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'build')));

// 모든 나머지 요청을 index.html로 리디렉트
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
