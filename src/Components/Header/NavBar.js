
import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from 'react-router-dom';
import {appPages, countryOptions} from '../../common/constant';
import Select from 'react-select';

const NavBar = ({setCountry, isTopNewsActive, searchFormat, setCountryName})=> {
    const navigate = useNavigate()

    const colourStyles = {
        option: styles => ({ ...styles, color: 'black' })
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{paddingBottom: 2, paddingTop: 2}}>
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor:'pointer'
                            }}
                            onClick={() => navigate('/')}
                        >
                            NEWS API LOGO
                        </Typography>

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: isTopNewsActive ? 'black' : 'inherit',
                                textDecoration: 'none',
                                cursor:'pointer'
                            }}
                            onClick={() => navigate('/top-news')}
                        >
                            Top News
                        </Typography>

                        <Box
                            style={{display: `${searchFormat === 'top-headlines' ? 'flex' : 'none'}` }}
                            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            {appPages.map((item) => (
                                <Button
                                    key={item.title}
                                    onClick={() => navigate(`/top-news/${item.title.toLowerCase()}`) }
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block'
                                    }}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </Box>
                    </Box>


                    <form style={{display: searchFormat === 'top-headlines' ? 'block' : 'none'}}>
                        <label
                            id="aria-label-country"
                            htmlFor="aria-example-input"
                            style={{marginBottom: 10, display: 'block'}}
                        >
                            Select country
                        </label>

                        <Select
                            aria-labelledby="aria-label-country"
                            inputId="aria-example-input"
                            name="country"
                            onChange={value => {
                                setCountry(value.value)
                                setCountryName(value.label)
                            }}
                            defaultValue={countryOptions[0]}
                            options={countryOptions}
                            styles={colourStyles}
                            noOptionsMessage={() => "No countries found"}
                        />

                    </form>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
