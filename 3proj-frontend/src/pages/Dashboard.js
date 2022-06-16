import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '../components/WarningAlert';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import postFile from '../services/users/postFile';
import getFiles from '../services/users/getFiles';
import deleteFile from '../services/users/deleteFile';
import getBinaryFile from '../services/users/getBinaryFile';
import imagePlaceholder from '../media/image-placeholder.png';
import videoPlaceholder from '../media/video-placeholder.png';
import filePlaceholder from '../media/file-placeholder.png';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

export default function Dashboard() {
  const [alert, setAlert] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  // Get file informations
  const [cards, setCards] = useState([]);
  const [totalSpace, setTotalSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);

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

  const onDrop = useCallback(acceptedFiles => {
    // Upload the file
    var data = new FormData();
    data.append("file", acceptedFiles[0]);
    const handleResponse = async () => {
      const response = await postFile(localStorage.getItem("JSESSIONID"), data)
      console.log(acceptedFiles[0])
      if (response.request.status === 200) {
        setAlert(true);
        setStatusCode(response.request.status);
        getData();
      } else {
        setAlert(true);
        setStatusCode(response.request.status);
      }
    }
    handleResponse();
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  async function handleDuplicateFile(fileId, fileName) {
    // Get file
    const responseDownload = await getBinaryFile(localStorage.getItem("JSESSIONID"), fileId);
    if (responseDownload.request.status === 200) {
      // If file, upload file for user to duplicate it
      var file = new File([responseDownload.data], fileName, { type: responseDownload.data.type });
      var data = new FormData();
      data.append("file", file);
      const handleResponseUpload = async () => {
        const responseUpload = await postFile(localStorage.getItem("JSESSIONID"), data)
        if (responseUpload.request.status === 200) {
          setAlert(true);
          setStatusCode(responseUpload.request.status);
          getData();
        } else {
          setAlert(true);
          setStatusCode(responseUpload.request.status);
        }
      }
      handleResponseUpload();
      setIsLoading(false);
    } else {
      setAlert(true);
      setStatusCode(responseDownload.request.status);
    }
  }

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
    } else if (response.request.status === 204) {
      setAlert(true);
      setStatusCode(response.request.status);
      setAlertMessage("No files were found");
      setIsLoading(false);
    } else {
      setAlert(true);
      setStatusCode(response.request.status);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Dashboard">
      {alert ?
        < Alert statusCode={statusCode} alertMessage={alertMessage} />
        : null}

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
                <DownloadForOfflineIcon sx={{ fontSize: "60px" }} />
              </Typography>
            </div>
          </Box>
        </Box>
        <Box sx={{ width: '100%', pt: 4, pb: 0 }}>
          {
            isLoading ?
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <CircularProgress />
              </Box>
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
                        {("image".includes(item.content_type.substring(0, 5))) || ("video".includes(item.content_type.substring(0, 5))) ?
                          <Link className="Navigation-link" to={`/Dashboard/${item._id}`}>
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
                          </Link>
                          :
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
                        }
                        <CardActions>
                          <Button size="small" onClick={async () => {
                            const file = await handleDownloadFile(item._id)
                            const url = window.URL.createObjectURL(new Blob([file.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', item.filename);
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                          }}>
                            <DownloadRoundedIcon />
                            Download
                          </Button>
                          <Button size="small" onClick={async () => {
                            await handleDeleteFile(item._id)
                          }} sx={{ color: 'error.main' }} >
                            <DeleteForeverRoundedIcon />
                            Delete
                          </Button>
                          <Button size="small" onClick={async () => {
                            await handleDuplicateFile(item._id, item.filename)
                          }} sx={{ color: 'information' }} >
                            <ContentCopyIcon />
                            Duplicate
                          </Button>
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
    </div >
  )
}
