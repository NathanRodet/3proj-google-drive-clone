import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import imagePlaceholder from '../media/image-placeholder.png';
import videoPlaceholder from '../media/video-placeholder.png';
import filePlaceholder from '../media/file-placeholder.png';
import Alert from '../components/WarningAlert';
import getBinaryFile from '../services/users/getBinaryFile';
import deleteFile from '../services/users/deleteFile';
import getUserFiles from '../services/admin/getUserFiles'

export default function AdminPreview() {
  const { userId } = useParams();
  const [alert, setAlert] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  // Get file informations
  const [cards, setCards] = useState([]);
  const [totalSpace, setTotalSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    const response = await getUserFiles(localStorage.getItem("JSESSIONID"), userId)
    if (response.request.status === 200) {
      setCards(response.data.files)
      setTotalSpace(response.data.total_space_used)
      setIsLoading(false);
    } else if (response.request.status === 204) {
      setAlert(true);
      setStatusCode(response.request.status);
      setAlertMessage("No files were found");
      setIsLoading(false);
    } else {
      setAlert(true);
      setStatusCode(response.request.status);
    }
  }, [userId])

  async function handleDownloadFile(fileId) {
    const response = await getBinaryFile(localStorage.getItem("JSESSIONID"), fileId);
    if (response.request.status === 200) {
      setIsLoading(false);
      return response
    } else {
      setAlert(true);
      setStatusCode(response.request.status);
    }
  }

  async function handleDeleteFile(fileId) {
    const response = await deleteFile(localStorage.getItem("JSESSIONID"), fileId);
    if (response.request.status === 200) {
      setIsLoading(false);
      getData();
      return response
    } else {
      setAlert(true);
      setStatusCode(response.request.status);
    }
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="AdminPreview">
      {alert ?
        < Alert statusCode={statusCode} alertMessage={alertMessage} />
        : null}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 0, pl: 2, pr: 2 }}>
        <Box sx={{ width: '100%', pt: 2, pb: 0 }}>
          {
            isLoading ?
              <CircularProgress />
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
                  Browse users files
                </Typography>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {cards.map(item => (
                    <Grid item xs key={item._id}>
                      <Card sx={{ minWidth: 200 }} >
                        <Box>
                          <CardMedia
                            component="img"
                            alt={item.filename}
                            sx={{ minWidth: 200, maxWidth: 200, minHeight: 200, maxHeight: 200 }}
                            className="Margin-auto"
                            image={("image".includes(item.content_type.substring(0, 5))) ? imagePlaceholder : ("video".includes(item.content_type.substring(0, 5))) ? videoPlaceholder : filePlaceholder}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {
                                item.filename.length > 15 ? (item.filename.substring(0, item.filename.lastIndexOf('.')).substring(0, 15).concat("...") || item.filename)
                                  : (item.filename.substring(0, item.filename.lastIndexOf('.')) || item.filename)
                              }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <b>Size :</b> {item.size}
                              <br />
                              <b>Upload Date :</b> {item.upload_date.substring(0, 10)}
                              <br />
                              <b>Content Type :</b> {item.content_type.replace('/', " ")}
                            </Typography>
                          </CardContent>
                        </Box>
                        <CardActions>
                          <Button size="small" onClick={async () => {
                            const file = await handleDownloadFile(item._id)
                            console.log(file)
                            const url = window.URL.createObjectURL(new Blob([file.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', item.filename);
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                          }}>
                            Download
                          </Button>
                          <Button size="small" onClick={async () => {
                            await handleDeleteFile(item._id)
                          }} sx={{ color: 'error.main' }} > Delete File</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
          }
          {
            isLoading ?
              <CircularProgress />
              :
              <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ pt: 4, pb: 0 }}>
                {totalSpace} is the total space used for your {cards.length} files.
              </Typography>
          }
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Link className="Navigation-link" to="/AdminDashboard">
            <Button
              type="Link"
              variant="contained"
              className="Margin-auto"

              sx={{ mt: 2, mb: 2 }}
            >
              Back to Admin Dashboard
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  )
}
