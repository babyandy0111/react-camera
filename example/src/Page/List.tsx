import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, ImageListItemBar } from '@mui/material';

export const List = () => {
  const navigate = useNavigate();

  const StandardImageList = () => {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <ImageList sx={{ width: 400, height: 'auto' }} cols={1}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  onClick={() => navigate('/photo/' + item.member)}
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  onClick={() => navigate('/photo/' + item.member)}
                  title={item.title}
                  subtitle={<span>by: {item.author}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    );
  };

  const itemData = [
    {
      img: './static/media/1.png',
      title: 'xxxxx',
      member: 1,
      author: 1,
    },
    {
      img: './static/media/2.png',
      title: 'oooo',
      member: 2,
      author: 2,
    },
    {
      img: './static/media/3.png',
      title: 'ffffff',
      member: 3,
      author: 3,
    },
    {
      img: './static/media/4.png',
      title: 'ggggg',
      member: 4,
      author: 4,
    },
  ];

  return (
    <>
      <StandardImageList />
    </>
  );
};
