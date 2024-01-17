module.exports.pagination = (data) => {
  const total_page = Math.ceil(data.count / data.per_page);
  const total_per_page = data.per_page;
  const current_page = data.page;
  const previous_page = current_page === 1 ? null : current_page - 1;
  const next_page = current_page === total_page ? null : current_page + 1;
  return {
    data: data.data,
    pagination: {
      total_records: data.count,
      total_per_page: total_per_page,
      total_page,
      current_page,
      previous_page,
      next_page,
    },
  };
};
