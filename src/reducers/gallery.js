const DEFAULT_IMAGES = [];

export const gallery = (state, action) => {
  if (!state) {
    return {
      images: DEFAULT_IMAGES,
      loading: false,
    };
  }

  switch (action.type) {
    case 'IMAGES_LOADING':
      return {
        ...state,
        loading: true,
        gridRender: true,
      };
    case 'IMAGES_LOADED':
      return {
        ...state,
        loading: false,
        images: state.images.concat(action.images),
        next: action.next,
      };
    case 'IMAGES_LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'GRID_RENDER_start':
      return {
        ...state,
        gridRender: true,
      };
    case 'GRID_RENDER_END':
      return {
        ...state,
        gridRender: false,
      };
    default:
      return state;
  }
};

