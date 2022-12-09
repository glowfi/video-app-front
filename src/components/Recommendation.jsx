import { axiosInstance } from '../config.js';
import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import styled from 'styled-components';

const Cont = styled.div`
    flex: 2;
`;

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axiosInstance.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

    return (
        <>
            <Cont>
                {videos.map((video) => (
                    <Card type="sm" key={video._id} vd={video} />
                ))}
            </Cont>
        </>
    );
};

export default Recommendation;
