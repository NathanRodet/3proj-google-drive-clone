import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Dashboard() {
  return (
    <div className="ContactUs">
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 0, pl: 2, pr: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3AQuality_images%2Ffr&psig=AOvVaw2keM6nczzkTDNzr-eCEg9K&ust=1653383497760000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiVqdKj9fcCFQAAAAAdAAAAABAD"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3AQuality_images%2Ffr&psig=AOvVaw2keM6nczzkTDNzr-eCEg9K&ust=1653383497760000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiVqdKj9fcCFQAAAAAdAAAAABAD"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </ListItem>
          </List>
        </Container>
      </ThemeProvider>
    </div >
  )
}
