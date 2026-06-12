package net.deepblacksea.train_api.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.time.Instant;

public interface AnalyticsRepo extends Repository<net.deepblacksea.train_api.model.SetEntry, UUID>{
    interface PrProjection {//a personal record basically
        UUID getExerciseId();
        String getExerciseName();
        BigDecimal getTopSingleKg();
        BigDecimal getBestEst1rmKg();
    }

    interface WeeklyVolumeProjection {
        LocalDate getWeekStart();
        BigDecimal getTotalVolumeKg();
        ///one weeks total training in tersm of volume
    }

    interface RecentSessionProjection {
        UUID getSessionId();
        Instant getStartedAt();
        Integer getSetsCount();
        Integer getRepsCount();
        BigDecimal getVolumeKg();
        //on erecent session summary from x amount of sessions
    }

    //SQL queries

    //sorts our PR per exercise for a user
    @Query(value = """
        select exercise_id as exerciseId,
        exercise_name as exerciseName,
        top_single_kg as topSingleKg,
        best_est_1rm_kg as bestEst1rmKg
        from v_prs_per_exercise where user_id = :userId order by exercise_name""", nativeQuery = true)
    List<PrProjection> findPrs(UUID userId);

    //weekly volume for a number of weeks
    @Query(value = """
        select week_start as weekStart,
        total_volume_kg as totalVolumeKg
        from v_weekly_volume where user_id = :userId and week_start >= (current_date - (:weeks || ' weeks')::interval)
        order by week_start
        """, nativeQuery = true)
    List<WeeklyVolumeProjection> weeklyVolume(UUID userId, int weeks);

    //recent sessions with summary of stats
    @Query(value = """
        select session_id as sessionId,
        started_at as startedAt,
        sets_count as setsCount,
        reps_count as repsCount,
        volume_kg as volumeKg
        from v_session_summaries where user_id = :userId order by started_at desc
        limit :limit
        """, nativeQuery = true)
    List<RecentSessionProjection> recentSessions(UUID userId, int limit);



}
