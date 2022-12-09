import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Upload from '../components/Upload.jsx';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice.js';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.menuBack};
    height: 56px;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 20px;
    justify-content: flex-end;
    position: relative;
`;
const Search = styled.div`
    width: 30%;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ccc;
    color: ${({ theme }) => theme.allText};
`;
const Input = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    width: 100%;
    color: ${({ theme }) => theme.allText};
    font-size: 1.3rem;
`;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.allText};
`;
const Avatar = styled.img`
    height: 32px;
    width: 32px;
    border-radius: 50%;
    /* background-color: #999; */
`;

const Bu = styled.button`
    border-radius: 2px;
    border: none;
    padding: 6px 10px;
    font-weight: 500;
    cursor: pointer;
    background-color: #f1f5f8;
    margin-left: 20px;
`;

const Navbar = () => {
    const { currUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate(`/search?q=${query}`);
    };
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    // console.log(currUser);
    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input
                            placeholder="Search"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <SearchOutlinedIcon
                            style={{ cursor: 'pointer' }}
                            onClick={handleSearch}
                        />
                    </Search>
                    {currUser ? (
                        <User>
                            <VideoCallOutlinedIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => setOpen(true)}
                            />
                            <p
                                style={{ cursor: 'pointer' }}
                                onClick={() => setOpen(true)}
                            >
                                Upload Video
                            </p>
                            <Avatar src={currUser.user?.img} />
                            {currUser.user?.name}
                        </User>
                    ) : (
                        <Link
                            to="/signin"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Button>
                                <AccountCircleOutlinedIcon />
                                SIGN IN
                            </Button>
                        </Link>
                    )}
                    {currUser ? <Bu onClick={handleLogout}>Logout</Bu> : ''}
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen} />}
        </>
    );
};

export default Navbar;
