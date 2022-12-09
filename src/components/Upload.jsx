import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage';
import app from '../utils/firebase.js';
import {axiosInstance} from '../config.js';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    /* border: 2px solid red; */
    width: 600px;
    height: 600px;
    background-color: ${({ theme }) => theme.menuBack};
    color: ${({ theme }) => theme.allText};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    padding: 20px;
`;
const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bolder;
    font-size: 32px;
    cursor: pointer;
`;
const Title = styled.h1`
    color: ${({ theme }) => theme.allText};
`;
const Label = styled.h3`
    color: ${({ theme }) => theme.allText};
    text-align: left;
`;

const Input = styled.input`
    font-size: 1rem;
    padding: 5px;
`;
const Desc = styled.textarea`
    font-size: 1rem;
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

const Upload = ({ setOpen }) => {
    const navigate = useNavigate();

    const [img, setImg] = useState(null);
    const [vid, setVid] = useState(null);

    const [imgPerc, setimgPerc] = useState(0);
    const [vidPerc, setvidPerc] = useState(0);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tags, setTags] = useState([]);

    const [imgurl, setImgurl] = useState('');
    const [vidurl, setVidurl] = useState('');

    const handleUpload = async () => {
        // console.log(title);
        // console.log(desc);
        // console.log(tags);
        // console.log(imgurl);
        // console.log(vidurl);

        const res = await axiosInstance.post('/videos', {
            title,
            desc,
            thumbnail: imgurl,
            url: vidurl,
            tags
        });
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
    };

    const uploadFile = (file, type) => {
        const storage = getStorage(app);
        const fileName = `${type}--` + new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                type === 'vid'
                    ? setvidPerc(Math.round(progress))
                    : setimgPerc(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    type === 'vid'
                        ? setVidurl(downloadURL)
                        : setImgurl(downloadURL);
                    // console.log('File available at', downloadURL);
                });
            }
        );
    };

    useEffect(() => {
        vid && uploadFile(vid, 'vid');
    }, [vid]);
    useEffect(() => {
        img && uploadFile(img, 'img');
    }, [img]);

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload new Video</Title>
                <Label>Video File :</Label>
                {vidPerc > 0 ? (
                    'Uploading : ' + vidPerc + '%'
                ) : (
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVid(e.target.files[0])}
                    />
                )}
                <Input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Desc
                    placeholder="Description"
                    rows={8}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Seperate tags with comma"
                    onChange={(e) => setTags(e.target.value.split(','))}
                />
                <Label>Image/Thumbnail:</Label>
                {imgPerc > 0 ? (
                    'Uploading : ' + imgPerc + '%'
                ) : (
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                )}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    );
};

export default Upload;
