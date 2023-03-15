function paginate(items, pageSize, currentPage, isFromBegin) {
  if (!items.length) throw new Error("items Array is empty");

  const idxStart = isFromBegin ? 0 : pageSize * currentPage;
  const idxEnd = pageSize * (currentPage + 1);

  return items.slice(idxStart, idxEnd);
}

export default paginate;
