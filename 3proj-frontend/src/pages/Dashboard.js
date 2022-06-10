import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '../components/WarningAlert';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import postFile from '../services/users/postFile';
import getFiles from '../services/users/getFiles';
import imagePlaceholder from '../media/image-placeholder.png';
import videoPlaceholder from '../media/video-placeholder.png';
import filePlaceholder from '../media/file-placeholder.png';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Dashboard() {
  const [alert, setAlert] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  // Get file informations
  const [cards, setCards] = useState([]);
  const [totalSpace, setTotalSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onDrop = useCallback(acceptedFiles => {
    // Upload the file
    var data = new FormData();
    data.append("file", acceptedFiles[0]);
    const handleResponse = async () => {
      await postFile(localStorage.getItem("JSESSIONID"), data).then(
        response => {
          setAlert(true);
          setStatusCode(response.request.status);
        }
      )
    }
    handleResponse();
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  useEffect(() => {
    const getData = async () => {
      const response = await getFiles(localStorage.getItem("JSESSIONID"))
      if (response.request.status === 200) {
        setCards(response.data.files)
        console.log(response.data.files)
        setTotalSpace(response.data.total_space_used)
        setIsLoading(false);
      } else {
        setAlert(true);
        setStatusCode(response.request.status);
      }
    }
    getData();
  }, []);

  return (
    <div className="Dashboard">
      <ThemeProvider theme={theme}>
        {alert ?
          < Alert statusCode={statusCode} />
          : null}
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 4, pb: 0, pl: 2, pr: 2 }}>
          <Box sx={{ width: '50%' }} className="Margin-auto">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              sx={{ marginBottom: 3 }}
              gutterBottom
            >
              Upload a new file
            </Typography>
            <Box sx={{ mt: 0, borderRadius: '16px' }} style={{ "backgroundColor": "lightblue" }} className="Dashboard-cursor">
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ pt: 4, pb: 4 }}>
                  Drop the file here, or click to select file
                </Typography>
              </div>
            </Box>
          </Box>
          <Box sx={{ width: '100%', pt: 4, pb: 0 }}>

            {/* content_type: "image/png"
filename: "visits.png"
owner_id: "6266a8d09b2df683c296e4ae"
size: "852 KB"
upload_date: "2022-06-08T13:21:20.481Z"aze
_id: "62a0a2503dd6891a9cdbc301" */}
            {
              isLoading ?
                null
                :
                <Box>
                  <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    sx={{ pb: 3 }}
                  >
                    Browse your files
                  </Typography>
                  <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {cards.map(item => (
                      <Grid item xs key={item._id}>
                        <Card sx={{ minWidth: 200 }} >
                          <CardMedia
                            component="img"
                            alt={item.filename}
                            sx={{ minWidth: 200, maxWidth: 200, minHeight: 200, maxHeight: 200 }}
                            className="Margin-auto"
                            image={("image".includes(item.content_type.substring(0, 5))) ? imagePlaceholder : ("video".includes(item.content_type.substring(0, 5))) ? videoPlaceholder : filePlaceholder}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {item.filename}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lizards are a widespread group of squamate reptiles, with over 6,000
                              species, ranging across all continents except Antarctica
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">Download</Button>
                            <Button size="small" sx={{ color: 'error.main' }} > Delete File</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
            }
            {
              isLoading ?
                null
                :
                <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ pt: 4, pb: 0 }}>
                  {totalSpace} is the total space used for your {cards.length} files.
                </Typography>
            }
          </Box>
        </Container>
      </ThemeProvider>
    </div >
  )
}
