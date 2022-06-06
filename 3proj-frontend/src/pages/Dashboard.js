import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
      file: acceptedFiles[0]
    }
    console.log(data.file)
    const handleResponse = async () => {
      await postFile(localStorage.getItem("JSESSIONID"), data).then(
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  // const handlePostFile = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   const file = new FormData();
  //   file.append('file', file);
  //   console.log(file);
  //   const response = await postFile(localStorage.getItem("JSESSIONID"), file);
  //   setResponse(response);
  //   setIsLoading(false);
  // }

  return (
    <div className="ContactUs">
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
          <Box sx={{ mt: 1 }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    </div >
  )
}
