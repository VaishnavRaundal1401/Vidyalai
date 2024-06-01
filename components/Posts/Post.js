import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 100%', // Ensure each item takes up full width
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
  // padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  width: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PrevButton = styled(Button)`  
  left: 1px;
`;

const NextButton = styled(Button)`
  right: 0.1px
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [images, setImages] = useState(
    post.images.map((image, index) => ({ ...image, uniqueId: index }))
  );
  const imageCounterRef = useRef(post.images.length);

  const fetchNewImage = async () => {
    const response = await axios.get('https://picsum.photos/280/300', { responseType: 'arraybuffer' });
    const newImageUrl = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
    return newImageUrl;
  };

  const handleNextClick = async () => {
    if (carouselRef.current) {
      const newImageUrl = await fetchNewImage();
      setImages((prevImages) => [
        ...prevImages.slice(2),
        { url: newImageUrl, uniqueId: imageCounterRef.current++ }
      ]);
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth, // Scroll by the full width of one image
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = async () => {
    if (carouselRef.current) {
      const newImageUrl = await fetchNewImage();
      setImages((prevImages) => [
        { url: newImageUrl, uniqueId: imageCounterRef.current++ },
        ...prevImages.slice(0, -1)
      ]);
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth, // Scroll by the full width of one image
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {images.map((image) => (
            <CarouselItem key={image.uniqueId}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;