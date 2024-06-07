const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start, limit } = req.query;
  const posts = await fetchPosts({ start, limit });


  const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = usersResponse.data;

  const postsWithUserData = posts.map(post => {
    const user = users.find(user => user.id === post.userId);
    return {
      ...post,
      user: {
        name: user.name,
        email: user.email
      }
    };
  });

  const postsWithImages = await Promise.all(postsWithUserData.map(async (post) => {
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
