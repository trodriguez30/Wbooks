import {BookProps} from '../definitions/interfaces';

export const getThumbBook = (image_url: any) => {
  return image_url
    ? {uri: image_url}
    : require('../assets/images/default_book.png');
};

/*
  Function to be able to search by giving a keyword
  and filter an array of books to return a new array
  with the books that contain the keyword in its title.
*/
export const filterBooksByKeyword = (
  booksArray: Array<any>,
  keywordToSearch: string,
) => {
  const newData = booksArray.filter((item) => {
    const itemData = `${item.title.toUpperCase()}`;
    const textData = keywordToSearch.toUpperCase();

    return itemData.indexOf(textData) > -1;
  });
  return newData;
};

export const isFavorite = (favoriteList, bookItem) => {
  const favorite = favoriteList.filter(
    (book: BookProps) => book.id === bookItem.id,
  );
  const isFavoriteState = favorite.length !== 0;
  const icon = isFavoriteState
    ? require('../assets/icons/fav.png')
    : require('../assets/icons/unfav.png');
  return {isFavoriteState, icon};
};
