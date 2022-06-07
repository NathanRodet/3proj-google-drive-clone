import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import postFile from '../services/users/postFile';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Dashboard() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const data = {
      file: acceptedFiles
    }
    console.log(data)
    const handleResponse = async () => {
      await postFile(localStorage.getItem("JSESSIONID"), acceptedFiles).then(
        response => {
          console.log(response)
          if (response.request.status === 200) {
            setAlert(false);
          } else if (response.request.status === 400) {
            setAlertContent(response.response.data.message);
            setAlert(true);
          }
          else {
            setAlertContent("This is an error alert — Please contact the administrator!");
            setAlert(true);
          }
        }
      )
    }
    handleResponse();
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className="Dashboard">
      <ThemeProvider theme={theme}>
        {alert ?
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {alertContent}
          </Alert>
          : null}
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 0, pl: 2, pr: 2 }}>
          <Box sx={{ mt: 0, borderRadius: '16px' }} style={{ "backgroundColor": "lightblue" }} className="Dashboard-cursor">
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ pt: 4, pb: 4 }}>
                Drop the file here, or click to select files
              </Typography>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    </div >
  )
}
