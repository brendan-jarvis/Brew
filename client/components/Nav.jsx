import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import md5 from 'md5'

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  SwipeableDrawer,
  IconButton,
  Container,
  Avatar,
  Button,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'

import {
  Science,
  Menu as MenuIcon,
  Login,
  Favorite,
  Search,
  Shuffle,
} from '@mui/icons-material'

const pages = [
  { text: 'Favourites', icon: Favorite },
  { text: 'Search', icon: Search },
  { text: 'Random', icon: Shuffle },
]

function Nav() {
  const session = supabase.auth.session()

  const [open, setOpen] = useState(false)

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Science sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Brew!
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="Toggle navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpen(!open)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            >
              <List>
                {pages.map((page) => (
                  <ListItem
                    key={page.text}
                    component={NavLink}
                    to={page.text.toLowerCase()}
                    onClick={() => setOpen(false)}
                  >
                    <ListItemIcon>
                      {React.createElement(page.icon)}
                    </ListItemIcon>
                    <ListItemText primary={page.text} />
                  </ListItem>
                ))}
              </List>
            </SwipeableDrawer>
          </Box>
          <Science sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Brew!
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                component={NavLink}
                color="inherit"
                to={page.text.toLowerCase()}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {session?.user ? (
              <Tooltip title="Edit profile">
                <IconButton component={NavLink} to="/account" sx={{ p: 0 }}>
                  <Avatar
                    src={
                      session?.user.avatar_url
                        ? session?.user.avatar_url
                        : `https://www.gravatar.com/avatar/${md5(
                            session?.user.email
                          )}`
                    }
                    alt={`${session?.user.username} avatar`}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login">
                <IconButton
                  component={NavLink}
                  to="/auth"
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Login />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Nav
