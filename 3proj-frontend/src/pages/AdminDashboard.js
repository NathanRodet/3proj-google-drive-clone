import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '../components/WarningAlert';
import getUsers from '../services/admin/getUsers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import deleteUser from '../services/admin/deleteUser';

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [statusCode, setStatusCode] = useState(null);

  async function handleDeleteUser(userId) {
    const response = await deleteUser(localStorage.getItem("JSESSIONID"), userId);
    if (response.request.status === 200) {
      setIsLoading(false);
      getData();
      return response
    } else {
      setAlert(true);
      setStatusCode(response.request.status);
    }
  }

  const getData = async () => {
    const response = await getUsers(localStorage.getItem("JSESSIONID"))
    setIsLoading(false);
    if (response.request.status === 200) {
      setRows(response.data)
    } else {
      setAlert(true);
      setStatusCode(response.request.status);
    }
  }

  // Handle data

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="AdminDashboard">
      <Container disableGutters maxWidth="large" component="main" sx={{ pt: 4, pb: 0, pl: 6, pr: 6 }}>
        <Box sx={{ width: '100%' }}>
          {
            isLoading ?
              null
              :
              alert ?
                < Alert statusCode={statusCode} />
                :
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Delete </TableCell>
                        <TableCell align="center">Preview </TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">
                            <Button color="secondary">
                              <DeleteForeverIcon color="error" onClick={() => {
                                handleDeleteUser(row._id)
                              }} />
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button color="secondary">
                              <AccountCircleIcon color="primary" />
                            </Button>
                          </TableCell>
                          <TableCell component="th" scope="row">{row._id}</TableCell>
                          <TableCell align="left">{row.username}</TableCell>
                          <TableCell align="left">{row.first_name}</TableCell>
                          <TableCell align="left">{row.last_name}</TableCell>
                          <TableCell align="left">{row.mail}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
          }
        </Box>
      </Container>
    </div >
  );
}
