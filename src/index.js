import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search.jsx';
import Video from './pages/Video';
import { persistor, store } from './redux/store.js';
import { darkTheme, lightTheme } from './utils/Theme';

const Container = styled.div`
    display: flex;
`;

const Main = styled.div`
    flex: 7;
    background-color: ${({ theme }) => theme.mainBack};
    color: ${({ theme }) => theme.allText};
`;

const Wrapper = styled.div`
    padding: 18px 30px;
`;

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Container>
                <BrowserRouter>
                    <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Main>
                        <Navbar />
                        <Wrapper>
                            <Routes>
                                <Route path="/">
                                    <Route
                                        index
                                        element={<Home type="random" />}
                                    />
                                    <Route
                                        path="/trending"
                                        element={<Home type="trend" />}
                                    />
                                    <Route
                                        path="/subscribed"
                                        element={<Home type="subscribed" />}
                                    />
                                    <Route path="search" element={<Search />} />
                                    <Route index element={<Home />} />
                                    <Route path="signin" element={<Login />} />
                                    <Route path="video">
                                        <Route path=":id" element={<Video />} />
                                    </Route>
                                </Route>
                            </Routes>
                        </Wrapper>
                    </Main>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
