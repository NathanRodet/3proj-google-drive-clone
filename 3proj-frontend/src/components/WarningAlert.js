import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function WarningAlert(props) {
  const [open, setOpen] = React.useState(true);
  const statusCode = props.statusCode;
  const alertMessage = props.alertMessage;

  return (
    <div className="Alert">
      {
        (statusCode === 200) ?
          <Collapse in={open}>
            <Alert severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="large"
                  align="center"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 0 }}
            >
              <AlertTitle>
                Success
              </AlertTitle>
              You action has been successfully completed.
            </Alert>
          </Collapse>
          :
          (statusCode === 204) ?
            null
            : (statusCode === 400) ?
              <Collapse in={open}>
                <Alert severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="large"
                      align="center"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 0 }}
                >
                  <AlertTitle>
                    Error
                  </AlertTitle>
                  {
                    alertMessage ?
                      <Typography id="keep-mounted-modal-description">
                        {alertMessage}
                      </Typography>
                      :
                      <Typography id="keep-mounted-modal-description">
                        Bad request.
                      </Typography>
                  }
                </Alert>
              </Collapse>
              : (statusCode === 401) ?
                <Modal
                  keepMounted
                  open
                  aria-labelledby="keep-mounted-modal-title"
                  aria-describedby="keep-mounted-modal-description"
                >
                  <Link className="Navigation-link" to="/SignIn">
                    <Box sx={style}>
                      <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={{ color: 'error.main' }}>
                        Unauthorized
                      </Typography>
                      <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        Please click here to log again, your session must have finished.
                      </Typography>
                    </Box>
                  </Link>
                </Modal>
                : (statusCode === 404) ?
                  <Collapse in={open}>
                    <Alert severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="large"
                          align="center"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 0 }}
                    >
                      <AlertTitle>
                        Error
                      </AlertTitle>
                      {
                        alertMessage ?
                          <Typography id="keep-mounted-modal-description">
                            {alertMessage}
                          </Typography>
                          :
                          <Typography id="keep-mounted-modal-description">
                            Not found.
                          </Typography>
                      }
                    </Alert>
                  </Collapse>
                  : (statusCode === 500) ?
                    <Collapse in={open}>
                      <Alert severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="large"
                            align="center"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 0 }}
                      >
                        <AlertTitle>
                          Internal Server Error
                        </AlertTitle>
                        Please contact the support or the administrator.
                      </Alert>
                    </Collapse>
                    :
                    <Collapse in={open}>
                      <Alert severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="large"
                            align="center"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 0 }}
                      >
                        <AlertTitle>
                          Unknow Error
                        </AlertTitle>
                        Please contact the support or the administrator.
                      </Alert>
                    </Collapse>
      }
    </div >
  )
}
