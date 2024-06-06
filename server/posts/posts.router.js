// const express = require('express');
// const axios = require('axios');
// const { fetchPosts } = require('./posts.service');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const posts = await fetchPosts();

//   const postsWithImages = await Promise.all(posts.map(async (post) => {
//     const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
//     const images = response.data.map(photo => ({ url: photo.url }));

//     return {
//       ...post,
//       images: images.slice(0, 50), // Limit to 3 images per post
//     };
//   }));

//   res.json(postsWithImages);
// });

// module.exports = router;


const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start, limit } = req.query;
  const posts = await fetchPosts({ start, limit });

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const images = response.data.map(photo => ({ url: photo.url }));

    return {
      ...post,
      images: images.slice(0, 50), 
    };
  }));

  res.json(postsWithImages);
});

module.exports = router;
