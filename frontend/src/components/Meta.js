import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Farmy',
  description: 'Farm fresh produce straight to your doorstrep',
  keywords: 'fresh produce, farm, veggetables, fruits, berries, healthy, organic',
};

export default Meta;
