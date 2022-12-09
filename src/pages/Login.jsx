import axios from 'axios';
import { url } from '../config.js';
import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice.js';
import { auth, provider } from '../utils/firebase.js';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({ theme }) => theme.allText};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.menuBack};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: 50px 120px;
    gap: 10px;
    border-radius: 10%;
`;

const Title = styled.h1`
    font-size: 24px;
`;

// const SubTitle = styled.h2`
//     font-size: 20px;
//     font-weight: 300;
// `;

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    color: ${({ theme }) => theme.allText};
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: #f1f5f8;
    /* color: ${({ theme }) => theme.textSoft}; */
`;

const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    /* color: ${({ theme }) => theme.textSoft}; */
`;

const Links = styled.div`
    margin-left: 50px;
`;

const Link = styled.span`
    margin-left: 30px;
`;

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [remail, setrEmail] = useState('');
    const [rpass, setrPass] = useState('');

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();

    const handleSignin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const data = await axios.post(`${url}/auth/signin`, {
                email: email,
                password: pass
            });
            // if (data.data.success) {
            setEmail('');
            setPass('');
            if (!data.data.success) {
                dispatch(loginSuccess(data.data));
                console.log(data.data);
                navigate('/');
            } else {
                dispatch(loginSuccess(null));
                console.log(data.data);
            }
            // }
        } catch (err) {
            dispatch(loginFailure());
            console.log(err);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const data = await axios.post(`${url}/auth/signup`, {
                email: remail,
                password: rpass,
                name: name
            });
            setrEmail('');
            setrPass('');
            setName('');
            if (!data.data.success) {
                dispatch(loginSuccess(data.data));
                console.log(data.data);
                navigate('/');
            } else {
                dispatch(loginSuccess(null));
                console.log(data.data);
            }
        } catch (err) {
            dispatch(loginFailure());
            console.log(err);
        }
    };

    const handleSigninGoogle = () => {
        dispatch(loginStart());

        signInWithPopup(auth, provider)
            .then(async (res) => {
                console.log(res);
                const data = await axios.post(`${url}/auth/google`, {
                    // name: res.user.displayName.split(' ')[0].slice(0, 2),
                    name: res.user.displayName,
                    email: 't@t.com',
                    img: res.user.photoURL
                });
                if (!data.data.success) {
                    dispatch(loginSuccess(data.data));
                    console.log(data.data);
                    navigate('/');
                } else {
                    dispatch(loginSuccess(null));
                    console.log(data.data);
                }
            })
            .catch((err) => {
                dispatch(loginFailure());
                console.log(err);
            });
    };

    return (
        <Container>
            <Wrapper>
                <Title>Register</Title>
                <Input
                    placeholder="username"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder="email"
                    onChange={(e) => setrEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setrPass(e.target.value)}
                />
                <Button onClick={handleSignup}>Sign up</Button>
                <Title>or</Title>

                <Title>Sign in</Title>
                <Input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                />
                <Button onClick={handleSignin}>Sign in</Button>
                <Title>or</Title>

                <Button onClick={handleSigninGoogle}>
                    Sign in with Google Account
                </Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default Login;
