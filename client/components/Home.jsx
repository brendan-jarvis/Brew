import React from 'react'
import { Box, ImageList, ImageListItem, Typography } from '@mui/material'

function Home() {
  const itemData = [
    {
      img: '/lutz-wernitz-pcW5bR7gSJ4-unsplash.jpg',
      title: 'Light malt grains',
    },
    {
      img: '/markus-spiske-qn5iDwvOZgo-unsplash.jpg',
      title: 'Hop flowers',
    },
    {
      img: '/adam-wilson-I2f5BbeXPVY-unsplash.jpg',
      title: 'Bottled homebrew beers',
    },
    {
      img: '/claude-piche-EHbtjmz7hvw-unsplash.jpg',
      title: 'Copper brew kettles',
    },
    {
      img: '/elevate-GCD9u5Xb8Bc-unsplash.jpg',
      title: 'Wooden barrel aging',
    },
    {
      img: '/meritt-thomas-OGTEP0LyYNk-unsplash.jpg',
      title: 'Tasters of a variety of different coloured beers',
    },
  ]

  return (
    <>
      <Typography variant="h1" align="center">
        Welcome to Brew
      </Typography>
      <Box sx={{ padding: '1rem' }} align="center">
        <ImageList
          sx={{ width: 500, height: 450 }}
          variant="woven"
          cols={3}
          gap={4}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Typography variant="body1" align="justify" sx={{ padding: '1rem' }}>
        This is a homebrewing app that allows you to find and keep track of your
        favourite brewing recipes. It also has a brewing calculator that will
        provide unit conversions, help you calculate your beer colour,
        bitterness, and alcohol content, among other things.
        <br />
        <br />
        This app was built as a personal project of Brendan Jarvis to learn more
        about web development using React, Redux, and Material-UI.
        <br />
        <br />
        Recipes are sourced from the following websites:
      </Typography>
      <ul style={{ marginTop: 0 }}>
        <li>
          <a href="https://punkapi.com/">
            Brewdog&apos;s DIY Dog recipes provided by the PunkAPI.
          </a>
        </li>
        <li>
          <a href="https://github.com/LinusU/beer-recipes">
            LinusU&apos;s collection of beer recipes in beerjson format.
          </a>
        </li>
        <li>
          <a href="https://www.brewersfriend.com/homebrew-recipes/">
            Brewers Friend
          </a>
        </li>
      </ul>
    </>
  )
}

export default Home
