import React from 'react'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Footer() {

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ipgetinfo.com/index.php?lang=fr">
        DriveSup
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
