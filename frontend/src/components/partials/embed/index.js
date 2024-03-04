import React from 'react';

export function Embed(props) {
  const { url, title } = props;

  return <iframe title={title} src={url} className="w-full h-full" />;
}

export default Embed;
