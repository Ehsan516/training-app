package net.deepblacksea.train_api.api.dto;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.*;
public class SessionDtos {
    //payload for POST and Get/sessions
    public record SessionCreateReq(OffsetDateTime startedAt, String notes) {}
    public record SessionRes(UUID id, OffsetDateTime startedAt, String notes) {}

    //request payload for POST and GET /sessions/{id}/sets
    public record SetCreateReq(UUID exerciseId, Integer reps, BigDecimal weightKg, BigDecimal rpe, String notes) {}
    public record SetRes(UUID id, UUID exerciseId, Integer reps, BigDecimal weightKg, BigDecimal rpe, String notes) {}

    public record SessionWithSets(SessionRes session, List<SetRes> sets) {} //one session with all its sets
}

