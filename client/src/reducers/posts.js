export default (posts = [], action) => {
  if (action.type === 'CREATE') {
    return [...posts, action.payload];
  }

  if (action.type === 'FETCH_ALL') {
    return action.payload;
  }

  return posts;

  // switch (action.type) {
  //   case 'FETCH_ALL':
  //     return posts;
  //   case 'CREATE':
  //     return posts;
  //   default:
  //     break;
  // }
};
