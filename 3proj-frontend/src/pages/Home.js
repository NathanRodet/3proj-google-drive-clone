import React from 'react'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Link as RouterLink } from 'react-router-dom';

const theme = createTheme();

const tiers = [
  {
    title: 'Pro',
    price: '15',
    description: [
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'outlined',
    link: '/Documentation',
  },
  {
    title: 'Free',
    subheader: 'Most popular',
    price: '0',
    description: [
      'Unlimited GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'contained',
    link: '/SignUp'
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    link: 'ContactUs'
  },
];

export default function Home() {

  return (
    <div className="Home">
      <header className="navigation">
        <Navigation />
      </header>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 0, pl: 2, pr: 2 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to DriveSup
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Easy and secure access to your content.
            <br />
            Store files and access them from all your devices : mobile device, tablet, or computer.
          </Typography>
        </Container>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6, pl: 2, pr: 2 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Pricing
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            Quickly build an effective pricing table for your potential customers with
            this layout. It&apos;s built with default MUI components with little
            customization.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="text.primary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /To
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <RouterLink className="Navigation-link" to={tier.link}>
                    <CardActions>
                      <Button fullWidth variant={tier.buttonVariant}>
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </RouterLink>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
      <footer className="footer">
        <Footer />
      </footer>
    </div >
  )
}
