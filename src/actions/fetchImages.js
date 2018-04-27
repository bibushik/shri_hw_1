export default function fetchImages() {
  return async function (dispatch, getState) {
    dispatch({
      type: 'IMAGES_LOADING',
      loading: true,
    });

    try {
      console.log('I\'m trying');

//      const API_KEY = 'nW5xEhNEDU7FqpuUyQWvtgyutcfhytsH';
        const API_KEY = '2674208-fa734feaaff682e1bc4c99b41';
      const LIMIT = 25;

      const next = getState().gallery.next;
      let responseJSON = {};

      if (next && LIMIT*next.page >= next.count) {
        return;
      }


      let params = '';
      // if (!next) {
      //   params = `search?q=funny+cat&api_key=${API_KEY}&limit=${LIMIT}`;
      // } else {
      //   params = `search?q=funny+cat&api_key=${API_KEY}&limit=${LIMIT}&offset=${next.offset + next.count}`;
      // }
        let page = 1;
        if (!next) {
            params = `?key=${API_KEY}&q=funny+cat&image_type=photo&per_page=${LIMIT}`;
        } else {
            page = next.page+1;
            params = `?key=${API_KEY}&q=funny+cat&image_type=photo&per_page=${LIMIT}&page=${page}`;
        }

      //const response = await fetch(`http://api.giphy.com/v1/gifs/${params}`);
        const response = await fetch(`https://pixabay.com/api/${params}`);
      responseJSON = await response.json();
      console.log('I\'m almost ready');


      dispatch({
        type: 'IMAGES_LOADED',
        images: responseJSON.hits,
        next: {
            page: page,
            count: responseJSON.total
        },
      });
    } catch (error) {
      dispatch({
        type: 'IMAGES_LOAD_ERROR',
        error,
      });
    } finally {
      dispatch({
        type: 'IMAGES_LOADING',
        loading: false,
      });
    }
  };
}
