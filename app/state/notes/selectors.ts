import { RootState } from '../types';

export default {
  listBooks: () => (state: RootState): Book[] => {
    return state.notes.books;
  }
  // names: (clusterId: string) => (state: State) =>
  //   keys<string>(state.spaces[clusterId]),
};
