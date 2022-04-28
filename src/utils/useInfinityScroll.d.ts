declare type UseInfinityScroll = (onLoadMore: () => void) => {
  containerRef: (el: HTMLElement) => void;
  loadMoreRef: (el: HTMLElement) => void;
};
declare const useInfinityScroll: UseInfinityScroll;
export default useInfinityScroll;
