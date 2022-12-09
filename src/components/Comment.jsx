import { axiosInstance } from '../config.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 30px;
    margin-bottom: 25px;
`;

const CurrComm = styled.div`
    display: flex;
    gap: 10px;
`;
const Image = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`;


const Text = styled.span`
    font-size: 14px;
`;

const Comment = ({ det }) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        // dispatch(fetchStart());
        const getVideo = async () => {
            const data = await axiosInstance.get(`/users/find/${det.userId}`);
            console.log(data.data);
            setChannel(data.data);
        };
        getVideo();
    }, [det.userId]);

    return (
        <Container>
            <CurrComm>
                <Image src={channel.img} />
                <Details>
                    <Name>{channel.name}</Name>
                    <Text>{det.comment}</Text>
                </Details>
            </CurrComm>
        </Container>
    );
};

export default Comment;
