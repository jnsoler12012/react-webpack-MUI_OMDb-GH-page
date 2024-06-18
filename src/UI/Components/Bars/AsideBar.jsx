import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { IoPersonSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { HiOutlineMenu } from "react-icons/hi";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { FaFilter } from "react-icons/fa6";


const drawerWidth = 240;

export default function (props) {
    console.log(props);
    const { children, execFilterSearch, movieList } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const searchRef = React.useRef('')


    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    var drawer

    if (movieList) {
        const countByYear = movieList.reduce((acc, movie) => {
            acc[movie.Year] = (acc[movie.Year] || 0) + 1;
            return acc;
        }, {});

        const countByDirector = movieList.reduce((acc, movie) => {
            if (movie.Director) {
                acc[movie.Director] = (acc[movie.Director] || 0) + 1;
            }
            return acc;
        }, {});

        drawer = (
            <Box
                sx={{
                    height: '100%',
                }}>
                <Toolbar />
                <Divider />

                <Divider />
                <Typography variant='h5' children='Movie Year counter' sx={{ textAlign: 'center' }} />
                <List>
                    {Object.entries(countByYear).map(([year, count]) => (
                        <ListItem key={year} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <IoPersonSharp />
                                </ListItemIcon>
                                <ListItemText primary={`${year} - ${count}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography variant='h5' children='Director counter' sx={{ textAlign: 'center' }} />
                <List>
                    {Object.entries(countByDirector).map(([director, count]) => (
                        <ListItem key={director} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <IoPersonSharp />
                                </ListItemIcon>
                                <ListItemText primary={`${director} - ${count}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
        );
    }



    return (
        <Box sx={{
            ml: { sm: `${drawerWidth}px` },
            display: 'flex',
            height: 'auto',
            flexDirection: 'column',
            width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
            background: 'rgb(255, 255, 255)',
            background: 'linear - gradient(180deg, rgba(255, 255, 255, 0) 0 %, rgba(255, 255, 255, 0) 100%)',
        }}>
            <CssBaseline />
            <AppBar
                id='HeaderBar'
                position="relative"
                sx={{
                    width: { sm: `auto` },
                    background: ' rgb(255,255,255)',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Toolbar sx={{
                    borderRadius: '1rem',
                    backgroundColor: 'white',
                    width: '60%',
                    height: 'auto'
                }}>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <HiOutlineMenu />
                    </IconButton>
                    <Box id='filterOptionsContainer'
                        sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center' }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto', m: '0.5rem' }}>
                            <FaFilter size='2rem' style={{ marginRight: '2%' }} color='#1976d2' />
                            <TextField inputRef={searchRef} id="input-with-sx" label="With" sx={{
                                '& .MuiInputLabel.MuiActive': { color: 'black' }
                            }} />

                        </Box>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', width: 'auto', m: '0.5rem' }}>
                            <FaFilter size='2rem' style={{ marginRight: '2%' }} color='#1976d2' />
                            <TextField id="input-with-sx" label="With" sx={{
                                '& .MuiInputLabel.MuiActive': { color: 'black' }
                            }} />
                        </Box> */}
                        <Button onClick={() => {
                            return execFilterSearch({
                                searchName: searchRef.current
                            })
                        }}
                            style={{ marginLeft: '2%' }}
                            variant="contained">Contained</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{

                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { padding: '0.3rem 0.7rem', boxShadow: 3, boxSizing: 'border-box', width: drawerWidth, height: '90%', top: '10%', position: 'fixed', margin: '6px 9px;' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        boxShadow: 3,
                        position: 'relative',
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { padding: '0.3rem 0.7rem', boxShadow: 3, boxSizing: 'border-box', width: drawerWidth, height: '90%', top: '10%', position: 'fixed', margin: '6px 9px;' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `100%` }, height: '100%' }}
            >
                {children}
            </Box>
        </Box >
    );
}