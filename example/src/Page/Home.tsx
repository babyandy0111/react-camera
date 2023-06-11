import React from 'react';
import { Box, Button, Container, CssBaseline, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const data = `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`;
  const Content = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // style={{ backgroundImage: `url(${bg})`, width: '10%', height: '100vh' }}
        sx={{
          minHeight: '300px',
          // minWidth: '1200px',
          // backgroundColor: 'beige',
          // border: '3px solid black',
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          // sx={{ minHeight: '100vh', width: '100%' }}
        >
          <Grid item xs={12}>
            <Grid item xs={12}>
              <img src={`data:image/jpeg;base64,${data}`} style={{ height: '70px', width: '70px' }}></img>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => navigate('./list')}>Enter</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const Footer = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '300px',
          // backgroundColor: 'darkblue',
          // color: 'white',
          // border: '3px solid black',
        }}
      >
        <img src={'./static/media/bk-1.png'} style={{ height: '300px', width: '100%' }}></img>
      </Box>
    );
  };

  function Layout(props: any) {
    return (
      <>
        <CssBaseline />
        {/*<NavBar></NavBar>*/}
        <Container disableGutters maxWidth={false}>
          <main>
            {/*<Header />*/}
            {props.children}
            <Footer />
          </main>
        </Container>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Content />
      </Layout>
    </>
  );
};
