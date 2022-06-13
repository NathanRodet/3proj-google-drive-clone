import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import getBinaryFile from '../services/users/getBinaryFile';
import Alert from '../components/WarningAlert';


export default function FileDetails() {
  const [alert, setAlert] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewFile, setPreviewFile] = useState(null);
  const [contentType, setContentType] = useState(null);
  const { fileId } = useParams();

  useEffect(() => {
    const getBinary = async () => {
      const response = await getBinaryFile(localStorage.getItem("JSESSIONID"), fileId);
      if (response.request.status === 200) {
        setContentType(response.data.type);
        setPreviewFile(URL.createObjectURL(response.data));
        setIsLoading(false);
      } else {
        setAlert(true);
        setStatusCode(response.request.status);
      }
    }
    getBinary();
  }, [fileId]);

  return (
    <div className="FileDetails">
      {alert ?
        < Alert statusCode={statusCode} />
        : null}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4, pb: 0, pl: 2, pr: 2 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            File preview for image and video
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3, mb: 3 }}
        >
          {
            isLoading ?
              <CircularProgress />
              :
              (contentType.split("/")[0] === "image") ?
                <img src={`${previewFile}`} alt="Preview" width="200" height="200" />
                : (contentType.split("/")[0] === "video") ?
                  <video autoPlay loop muted width="200" height="200">
                    <source src={`${previewFile}`} type={contentType} />
                  </video>
                  :
                  < Alert statusCode={statusCode} />
          }
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Link className="Navigation-link" to="/Dashboard">
            <Button
              type="Link"
              variant="contained"
              className="Margin-auto"

              sx={{ mt: 2, mb: 2 }}
            >
              Back to Dashboard
            </Button>
          </Link>
        </Box>
      </Container>
    </div >
  )
}