import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useLogin } from 'react-admin';
import { redirect } from 'react-router';

const CustomLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useLogin();

    const handleLogin = async () => {
        try {
            // react-admin의 useLogin 훅을 사용하여 로그인 처리
            // await login({ username, password });
            await login({ username, password });
        } catch (err) {
            setError('로그인 실패! 아이디와 비밀번호를 확인하세요.');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh', padding: 20 }}
        >
            <Box
                width="100%" 
                maxWidth={400} 
                padding={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h4" gutterBottom align="center">
                    ADMIN LOGIN
                </Typography>
                <TextField
                    label="아이디"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    label="비밀번호"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    style={{ marginBottom: 20 }}
                />
                {error && <Typography color="error" style={{ marginBottom: 20 }}>{error}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                >
                    로그인
                </Button>
            </Box>
        </Box>
    );
};

export default CustomLogin;
