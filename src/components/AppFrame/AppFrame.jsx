import React from 'react'

import Grid  from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import { IconContext } from 'react-icons';
import { WiDaySunny } from 'react-icons/wi'
import {Link as LinkRouter} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';


const AppFrame = ({children}) => {
    return (
        <Grid container
        justify="center">
        <AppBar position="static">
            <Toolbar variante="dense">
                <IconButton color="inherit" aria-label="menu">
                    <Link component={LinkRouter} to="/main" color="inherit" aria-label="menu">
                        <IconContext.Provider value={{size:'2em'}}>
                            <WiDaySunny></WiDaySunny>

                        </IconContext.Provider>
                    </Link>
                </IconButton>
                <Typography variant="h6" color="inherit">
                    Weather App
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container item
                xs={12}
                sm={11}
                md={10}
                bg={8}
                >{children}
        </Grid>
        </Grid>
    )
}

AppFrame.propTypes = {

}

export default AppFrame
