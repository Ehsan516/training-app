package net.deepblacksea.train_api.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import java.math.BigDecimal;

@Entity
@Table(name="sets")
public class SetEntry {
    @Id private UUID id;

    @Column(name="session_id", nullable=false)
    private UUID sessionId;

    @Column(name="exercise_id", nullable=false)
    private UUID exerciseId;

    @Column(name="weight_kg")
    private BigDecimal weightKg;
    @Column(name="created_at", nullable = false)
    private OffsetDateTime createdAt;
    public OffsetDateTime getCreatedAt(){ return createdAt; }
    public void setCreatedAt(OffsetDateTime t){ this.createdAt = t; }
    private Integer reps;

    private BigDecimal rpe;

    private String notes;

    public UUID getId(){ return id; }
    public void setId(UUID id){ this.id = id; }

    public UUID getSessionId(){ return sessionId; }
    public void setSessionId(UUID s){ this.sessionId = s; }

    public UUID getExerciseId(){ return exerciseId; }
    public void setExerciseId(UUID e){ this.exerciseId = e; }

    public BigDecimal getWeightKg(){ return weightKg; }
    public void setWeightKg(BigDecimal w){ this.weightKg = w; }

    public Integer getReps(){ return reps; }
    public void setReps(Integer r){ this.reps = r; }

    public BigDecimal getRpe(){ return rpe; }
    public void setRpe(BigDecimal r){ this.rpe = r; }

    public String getNotes(){ return notes; }
    public void setNotes(String n){ this.notes = n; }
}
