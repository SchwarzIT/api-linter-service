export default () => ({
  port: parseInt(process.env.PORT, 10),
  serverNames: {
    local: process.env.SERVER_NAME_LOCAL || '',
    prod: process.env.SERVER_NAME_PROD || '',
  },
  contactInformation: {
    name: process.env.CONTACT_NAME,
    link: process.env.CONTACT_LINK,
    email: process.env.CONTACT_EMAIL,
  },
  api: {
    tag: process.env.API_TAG,
    version: process.env.API_VERSION,
    title: process.env.API_TITLE,
    description: process.env.API_DESCRIPTION,
  },
  docs: {
    name: process.env.EXTERNAL_DOCS_NAME,
    link: process.env.EXTERNAL_DOCS_LINK,
  },
});
