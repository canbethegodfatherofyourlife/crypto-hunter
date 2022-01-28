import React, {useState, useEffect} from 'react';
import { CryptoState } from '../Context'
import axios from "axios";
import {HistoricalChart} from "../config/api" 
import { createTheme, ThemeProvider, makeStyles} from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress' ;
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import {chartDays} from '../config/data'
import SelectButton from './SelectButton'

const CoinInfo = ({coin}) => {

  const [historicalData, setHistoricalData] = useState()
  const [ days, setDays] = useState(1)
  const { currency } = CryptoState()
  const fetchHistoricalData = async() => {
    const {data} = await axios.get(HistoricalChart(coin.id , days, currency))
    setHistoricalData(data.prices)
    }

    useEffect(() => {
      fetchHistoricalData()
    },[days])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark"
    },
  })

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>

          {
            !historicalData ? (
              <CircularProgress style={{color:"gold"}} size={250} thickness={1} />
            ) : (
              <> 
                  <Line 
                    data={{
                      labels: historicalData.map(coin => {
                        let date = new Date(coin[0])
                        let time = date.getHours() > 12  ? `${date.getHours()-12} : ${date.getMinutes()}PM` : `${date.getHours()} : ${date.getMinutes()}AM`

                        return days===1 ? time : date.toLocaleDateString() 
                      }),
                      datasets: [{
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price (Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D"
                      }]
                    }}
                    options={{ 
                      elements: {
                        point: {
                          radius: 1,
                        }
                      }
                    }}
                  />
                  <div style={{ display: 'flex', marginTop:20 , justifyContent: 'space-around',width: '100%' }}>
                    {chartDays.map((day)=> (
                      <SelectButton key={day.value} selected={day.value=== days} onClick={()=> setDays(day.value)}>{day.label}</SelectButton>
                    ))}
                  </div>
              </>
              )
          }

        </div>
    </ThemeProvider>
  )
};

export default CoinInfo;
