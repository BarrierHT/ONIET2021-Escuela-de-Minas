import React from 'react';

const Title: React.FC<{ children: string }> = (props) => {
  const title = props.children;
  React.useEffect(() => {
    document.title = title;
  }, []);
  return null;
};

export default Title;
