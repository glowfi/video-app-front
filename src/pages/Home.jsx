import {axiosInstance} from '../config.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Home = ({ type }) => {
    const [video, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axiosInstance.get(`/videos/${type}`);
            console.log(res.data);
            setVideos(res.data);
        };
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {video.map((p, idx) => {
                return <Card key={idx} vd={video[idx]} />;
            })}
        </Container>
    );
};

export default Home;
