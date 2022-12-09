import { axiosInstance } from '../config.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import numeral from 'numeral';

const Container = styled.div`
    width: 360px;
    margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
    cursor: pointer;
    display: ${(props) => props.type === 'sm' && 'flex'};
    gap: ${(props) => props.type === 'sm' && '15px'};
`;

const Thumbnail = styled.img`
    width: 100%;
    height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
    flex: 1;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== 'sm' && '16px'};
    gap: 12px;
    flex: 1;
`;

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    /* background-color: #999; */
    display: ${(props) => props.type === 'sm' && 'none'};
`;

const TextContainer = styled.div``;
const Title = styled.h2`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.allText};
`;
const ChannelName = styled.h3`
    font-size: 1.1rem;
    font-weight: 100;
    margin: 8px 0px;
    color: ${({ theme }) => theme.allText};
`;
const Info = styled.p`
    font-size: 0.9rem;
    font-weight: 100;
    color: ${({ theme }) => theme.allText};
`;

const Card = ({ type, vd }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const data = await axiosInstance.get(`/users/find/${vd.userId}`);
            setUser(data.data);
        };
        getUser();
    }, [vd.userId]);

    return (
        <Link to={`/video/${vd._id}`} style={{ textDecoration: 'none' }}>
            <Container type={type}>
                <Thumbnail type={type} src={vd.thumbnail} />
                <Details type={type}>
                    <ChannelImage type={type} src={user.img} />
                    <TextContainer>
                        <Title>{vd.title}</Title>
                        <ChannelName>{user.name}</ChannelName>
                        <Info>
                            {numeral(vd.views).format('0a')} views .{' '}
                            {format(vd.createdAt)}
                        </Info>
                    </TextContainer>
                </Details>
            </Container>
        </Link>
    );
};

export default Card;
