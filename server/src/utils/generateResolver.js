'use strict';

function generateResolver(fn) {
  return async (obj, args, context) => {
    return await fn({ obj, args, context, client: context.client });
  }
}

module.exports = generateResolver;