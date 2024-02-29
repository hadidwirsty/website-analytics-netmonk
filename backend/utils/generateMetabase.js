const jwt = require('jsonwebtoken');

const generateMetabaseEmbedUrl = (resource, params) => {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

  const payload = {
    resource: { [resource.type]: resource.id },
    params,
    exp: Math.round(Date.now() / 1000) + 10 * 60,
  };

  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/${resource.type}/${token}#bordered=true&titled=true`;

  return iframeUrl;
};

module.exports = generateMetabaseEmbedUrl;

