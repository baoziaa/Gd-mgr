import store from '@/store';

export const getDestinationClassifiyTitleById = (id) => {
  const one = store.state.destinationClassifiy.find((item) => (item._id === id));

  return one && one.title || '未知分类';
};