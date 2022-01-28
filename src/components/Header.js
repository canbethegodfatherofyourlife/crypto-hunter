import React from 'react';
import {AppBar,Container,Toolbar,Typography,Select, MenuItem,createTheme, ThemeProvider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core' 
import { useHistory } from 'react-router-dom'
import {CryptoState} from '../Context'
const useStyles = makeStyles(()=> ({
    title: {
        flex: 1,
        color: 'gold',
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer"
    }
}))

const Header = () => {
    const classes = useStyles()
    const { currency,symbol,setCurrency } = CryptoState()
    console.log(currency)
    const darkTheme = createTheme({
        palette: {
          type: 'dark',
        },
      });
    const history = useHistory();
  return (<ThemeProvider theme={darkTheme} >
      <AppBar color='transparent' position='static'>
      <Container>
          <Toolbar>
              <Typography onClick={()=> history.push('/')} className={classes.title} variant='h6'>
                  Crypto Hunter
              </Typography>
              <Select defaultValue={currency} onChange={(e) => setCurrency(e.target.value)} value={currency} variant='outlined' style={{width:100,height:40,marginRight:15}}> 
                   <MenuItem value={"USD"}>USD</MenuItem>
                   <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
          </Toolbar>
      </Container>
      </AppBar>
  </ThemeProvider>);
};

export default Header;
