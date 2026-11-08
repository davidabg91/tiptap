export interface ReviewFilters {
  stars: 'all' | 'low' | 1 | 2 | 3 | 4 | 5;
  waiterId: string;
  query: string;
  sort: 'newest' | 'rating_high' | 'rating_low';
}

export const DEFAULT_REVIEW_FILTERS: ReviewFilters = { stars: 'all', waiterId: 'all', query: '', sort: 'newest' };
