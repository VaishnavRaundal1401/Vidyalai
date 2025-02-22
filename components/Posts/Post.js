import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

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
  flex: '0 0 100%', 
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
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
  right: 0.1px;
`;

const Avatar = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'gray',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '16px',
  marginRight: '10px',
  marginLeft:'10px'
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  marginTop:'10px'
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleNextClick = () => {
    if (carouselRef.current  && !isScrolling) {
      setIsScrolling(true);
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth, 
        behavior: 'smooth',
      });
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth, 
        behavior: 'smooth',
      });
      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('');
  };
  
  return (
    <PostContainer>
     <UserInfo>
        <Avatar>{getInitials(post.user.name)}</Avatar>
        <div>
          <strong>{post.user.name}</strong><br/>
          <span>{post.user.email}</span>
        </div>
      </UserInfo>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
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
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
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

