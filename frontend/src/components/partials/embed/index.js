import React from 'react';

export function Embed(props) {
  const { url, title } = props;

  return <iframe title={title} src={url} width="100%" height="100%" />;
}

export default Embed;
