'use strict';

function flattenResponse({ res, array = false, total = false }) {
  if (res.hits.total < 1) {
    return null;
  }

  const resArray = res.hits.hits.map(hit => Object.assign({}, hit._source, {id: hit._id}));

  if (array) {
    if (total) {
      return {
        total: res.hits.total,
        results: resArray
      };
    }

    return resArray;
  }

  return resArray[0];
}

module.exports = flattenResponse;