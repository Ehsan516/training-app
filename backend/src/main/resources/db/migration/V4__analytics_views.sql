create or replace function epley_1rm(weight_kg numeric, reps int)
returns numeric
language sql
immutable
as $$
    --epley 1RM w * (1 + reps/30)
    select case
        when weight_kg is null or reps is null then null
        when reps <= 1 then weight_kg::numeric
        else weight_kg * (1 + reps::numeric / 30.0)
    end;
$$;

--analytics view
create or replace view v_set_enriched as
select
  s.id                 as set_id,
  s.session_id,
  sess.user_id,
  sess.started_at,
  s.exercise_id,
  e.name               as exercise_name,
  s.weight_kg,
  s.reps,
  s.rpe,
  (coalesce(s.weight_kg,0) * coalesce(s.reps,0))::numeric as volume_kg,
  epley_1rm(s.weight_kg, s.reps)                          as est_1rm_kg
from sets s
join sessions sess on sess.id = s.session_id
join exercises e on e.id = s.exercise_id;

--PRs per exercise top single & best est 1RM
create or replace view v_prs_per_exercise as
select
  exercise_id,
  exercise_name,
  user_id,
  max(case when reps = 1 then weight_kg else null end) as top_single_kg,
  max(est_1rm_kg)                                      as best_est_1rm_kg
from v_set_enriched
group by user_id, exercise_id, exercise_name;

--weekly volume
create or replace view v_weekly_volume as
select
  user_id,
  date_trunc('week', started_at at time zone 'UTC')::date as week_start,
  sum(volume_kg)                                         as total_volume_kg
from v_set_enriched
group by user_id, date_trunc('week', started_at at time zone 'UTC')::date;

--recent session summaries
create or replace view v_session_summaries as
select
  sess.id                                               as session_id,
  sess.user_id,
  sess.started_at,
  count(s.id)                                           as sets_count,
  sum(coalesce(s.reps,0))                               as reps_count,
  sum(coalesce(s.weight_kg,0) * coalesce(s.reps,0))::numeric as volume_kg
from sessions sess
left join sets s on s.session_id = sess.id
group by sess.id, sess.user_id, sess.started_at;
