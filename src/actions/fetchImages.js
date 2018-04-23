export default function fetchImages() {
  return async function (dispatch, getState) {
    dispatch({
      type: 'IMAGES_LOADING',
      loading: true,
    });

    try {
      console.log('I\'m trying');

      const API_KEY = 'nW5xEhNEDU7FqpuUyQWvtgyutcfhytsH';
      const LIMIT = 25;

      const next = getState().gallery.next;
      let responseJSON = {};

      if (next && next.count < LIMIT) {
        return;
      }
      let params = '';
      if (!next) {
        params = `search?q=funny+cat&api_key=${API_KEY}&limit=${LIMIT}`;
      } else {
        params = `search?q=funny+cat&api_key=${API_KEY}&limit=${LIMIT}&offset=${next.offset + next.count}`;
      }

      const response = await fetch(`http://api.giphy.com/v1/gifs/${params}`);
      responseJSON = await response.json();
      console.log('I\'m almost ready');


      dispatch({
        type: 'IMAGES_LOADED',
        images: responseJSON.data,
        next: responseJSON.pagination,
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
