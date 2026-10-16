-- ============================================================================
-- Demo seed data — one venue + three waiters.
-- Run once (slugs are unique, so a second run will error harmlessly).
-- Replace the google_review_url with the venue's real "write a review" link
-- from its Google Business profile.
-- ============================================================================

with r as (
  insert into restaurants (name, slug, city, google_review_url, logo_url)
  values (
    'Ресторант Леденика',
    'ledenika',
    'София',
    'https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID',
    '/tiptap/logo.jpg'
  )
  returning id
)
insert into waiters (restaurant_id, slug, name, role, avatar_url)
select r.id, v.slug, v.name, v.role, v.avatar
from r,
(values
  ('waiter-1', 'Иван Петров',     'Старши Сервитьор',
   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'),
  ('waiter-2', 'Мария Георгиева',  'Сервитьор',
   'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'),
  ('waiter-3', 'Георги Димитров',  'Барман / Сервитьор',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200')
) as v(slug, name, role, avatar);
