import { fetchMovies } from '../fetchMovies';
import { addMovies, hasErrored } from '../../actions';

describe('fetchMovies', () => {
  let mockUrl;
  let mockDispatch;

  beforeEach(() => {
    mockUrl = 'www.someurl.com';
    mockDispatch = jest.fn();
  });

  it('should dispatch hasError with error message if response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: 'an error has occured'
      })
    );

    const thunk = fetchMovies(mockUrl);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('an error has occured'));
  });

  it.skip('Dispatches the addMovies(moviesArray) action if response is ok', async () => {
    const mockMovies = [{ name: 'Halloween' }, { name: 'It' }];

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            movies: [...mockMovies]
          })
      })
    );

    const thunk = fetchMovies(mockUrl);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addMovies(mockMovies));
  });
});

//test ALL dispatched actions and happy/sad paths
