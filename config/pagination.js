const pagination = (req) => {
  const pageAsNumber = Number.parseInt(req.params.page);
  const sizeAsNumber = Number.parseInt(req.params.page_size);
  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    page = pageAsNumber;
  }
  let page_size = 10;
  if (!Number.isNaN(sizeAsNumber) && pageAsNumber > 0 && pageAsNumber < 10) {
    page_size = sizeAsNumber;
  }
  return { page_size, page };
};

module.exports = { pagination };
