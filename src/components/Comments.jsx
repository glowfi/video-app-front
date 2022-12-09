import { axiosInstance } from '../config.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { initComments, addComments } from '../redux/CommentSlice.js';

const Container = styled.div`
    margin-top: 50px;
`;

const CurrComm = styled.div`
    display: flex;
    gap: 10px;
    /* flex-direction: column; */
`;
const Image = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;
const Input = styled.input`
    border: none;
    width: 100%;
    background-color: ${({ theme }) => theme.mainBack};
    border-bottom: 0.5px solid ${({ theme }) => theme.allText};
    font-size: 1rem;
    color: ${({ theme }) => theme.allText};
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 4px 4px;
    font-weight: 500;
    cursor: pointer;
    background-color: #f1f5f8;
    /* color: ${({ theme }) => theme.textSoft}; */
`;

const Comments = ({ videoId }) => {
    // const [comm, setComms] = useState([]);
    // console.log(videoId);
    //
    const [currcomm, setCurrcomm] = useState('');
    const { currUser } = useSelector((state) => state.user);

    const { currComments } = useSelector((state) => state.comments);
    const dispatch = useDispatch();

    const handleComm = async () => {
        const data = await axiosInstance.post(`/comms/${videoId}`, {
            comment: currcomm
        });
        console.log(data.data);
        if (data.status == 200) {
            setCurrcomm('');
            dispatch(addComments(data.data));
        }
    };

    useEffect(() => {
        const getC = async () => {
            const data = await axiosInstance.get(`/comms/${videoId}`);
            // console.log(data.data);
            // setComms(data.data);
            dispatch(initComments(data.data));
        };
        getC();
    }, [videoId]);
    return (
        <Container>
            {currUser ? (
                <CurrComm>
                    <Image src="https://0x0.st/o_hD.jpg" />
                    <Input
                        placeholder="Add a comment here..."
                        value={currcomm}
                        onChange={(e) => {
                            setCurrcomm(e.target.value);
                        }}
                    />
                    <Button onClick={handleComm}>Add Comment</Button>
                </CurrComm>
            ) : (
                <p>Login to post comments</p>
            )}
            {currComments?.map((p, idx) => {
                return (
                    <>
                        <Comment key={p._id} det={p} />
                    </>
                );
            })}
        </Container>
    );
};

export default Comments;
