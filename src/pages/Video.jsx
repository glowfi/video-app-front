import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import Comments from '../components/Comments';
import Recomm from '../components/Recommendation';
import { subscription } from '../redux/userSlice.js';
import {
    dislike,
    fetchStart,
    fetchSuccess,
    like
} from '../redux/videoSlice.js';
import axios from 'axios';
import { url } from '../config.js';
import numeral from 'numeral';

const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
    font-size: 1.4rem;
    font-weight: 600;
    margin-top: 10px;
`;

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const Info = styled.span``;
const ButtonCont = styled.div`
    display: flex;
    gap: 7px;
`;
const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.allText};
`;

const ChannelContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfoCont = styled.div`
    display: flex;
    gap: 15px;
`;
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: gray;
`;
const ChannelInf = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.allText};
`;

const ChannelName = styled.span`
    color: ${({ theme }) => theme.allText};
`;
const ChannelCounter = styled.span`
    color: ${({ theme }) => theme.allText};
`;

const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;

const Description = styled.p`
    margin-top: 20px;
    font-size: 14px;
`;

const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
    /* border: 1px solid red; */
`;

const Video = () => {
    const { currUser } = useSelector((state) => state.user);
    const { currVideo } = useSelector((state) => state.video);

    const dispatch = useDispatch();

    const path = useLocation();
    const pathLoc = path.pathname.split('/')[2];

    // const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const addV = async () => {
            const dat = await axios.put(`${url}/videos/views/${pathLoc}`);
            console.log(pathLoc);
            console.log(dat.data);
        };
        addV();
    }, [pathLoc]);

    useEffect(() => {
        dispatch(fetchStart());
        const getVideo = async () => {
            const data = await axios.get(`${url}/videos/find/${pathLoc}`);
            console.log(data.data);
            // setVideo(data.data);
            dispatch(fetchSuccess(data.data));

            const data2 = await axios.get(
                `${url}/users/find/${data.data.userId}`
            );
            console.log(data2.data);
            setChannel(data2.data);
        };
        getVideo();
    }, [pathLoc]);

    const handleLike = async () => {
        await axios.put(`${url}/users/like/${currVideo._id}`);
        dispatch(like(currUser.user._id));
    };
    const handleDislike = async () => {
        await axios.put(`${url}/users/dislike/${currVideo._id}`);
        dispatch(dislike(currUser.user._id));
    };
    const handleSub = async () => {
        console.log(channel._id);
        if (currUser.user.subscibedUsers.includes(channel._id)) {
            await axios.put(`${url}/users/unsub/${channel._id}`);
            dispatch(subscription(channel._id));
        } else {
            await axios.put(`${url}/users/sub/${channel._id}`);
            dispatch(subscription(channel._id));
        }
    };

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currVideo?.url} controls autoPlay />
                </VideoWrapper>
                <Title>{currVideo?.title}</Title>
                <Details>
                    <Info>
                        {numeral(currVideo?.views).format('0a')} views .{' '}
                        {format(currVideo?.createdAt)}
                    </Info>
                    <ButtonCont>
                        <Button onClick={handleLike}>
                            {currVideo?.likes?.includes(currUser?.user._id) ? (
                                <ThumbUpIcon />
                            ) : (
                                <ThumbUpOutlinedIcon />
                            )}
                            {currVideo?.likes.length}
                        </Button>
                        <Button onClick={handleDislike}>
                            {currVideo?.dislikes?.includes(
                                currUser?.user._id
                            ) ? (
                                <ThumbDownIcon />
                            ) : (
                                <ThumbDownOffAltOutlinedIcon />
                            )}
                            {currVideo?.dislikes.length}
                        </Button>
                        <Button>
                            <ReplyOutlinedIcon /> Share
                        </Button>
                        <Button>
                            <AddTaskOutlinedIcon /> Save
                        </Button>
                    </ButtonCont>
                </Details>
                <Hr />

                <ChannelContainer>
                    <ChannelInfoCont>
                        <Image src={channel.img} />
                        <ChannelInf>
                            <ChannelName>{channel.name}</ChannelName>
                            <ChannelCounter>
                                {channel.subscribers} subscribers
                            </ChannelCounter>
                            <Description>{currVideo?.desc}</Description>
                        </ChannelInf>
                    </ChannelInfoCont>
                    {currUser?.user ? (
                        <Subscribe onClick={handleSub}>
                            {currUser?.user?.subscibedUsers?.includes(
                                currVideo?.userId
                            )
                                ? 'Subscribed'
                                : 'Subscribe'}
                        </Subscribe>
                    ) : (
                        <p>Login to subscribe this channel</p>
                    )}
                </ChannelContainer>
                <Hr />
                <Comments videoId={currVideo?._id} />
            </Content>
            <Recomm tags={currVideo?.tags} />
        </Container>
    );
};

export default Video;
