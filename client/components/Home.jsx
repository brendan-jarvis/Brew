import React from 'react'
import { Box, ImageList, ImageListItem } from '@mui/material'

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
  ]

  return (
    <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
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
  )
}

export default Home
