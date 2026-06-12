-- global seed exercises
--user id is null as it's just exercise
insert into exercises (id, user_id, name, category, tags, is_custom) values
  ('00000000-0000-0000-0000-00000000a001', null, 'Bench Press','strength', array['pecs','triceps','front-delts'], false),
  ('00000000-0000-0000-0000-00000000a002', null, 'Barbell Squat','strength', array['quadriceps','glutes','erectors'], false),
  ('00000000-0000-0000-0000-00000000a003', null, 'Deadlift','strength', array['hamstrings','glutes','erectors'], false),
  ('00000000-0000-0000-0000-00000000a004', null, 'Overhead Press','strength', array['delts','triceps','upper-back'], false),
  ('00000000-0000-0000-0000-00000000a005', null, 'Barbell Row','strength', array['lats','upper-back','biceps'], false),
  ('00000000-0000-0000-0000-00000000a006', null, 'Chin-up','strength', array['lats','biceps','forearms'], false);
