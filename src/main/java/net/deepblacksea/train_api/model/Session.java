package net.deepblacksea.train_api.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity @Table(name="sessions")
public class Session {
    @Id private UUID id;
    @Column(name="user_id",nullable=false) private UUID userId;
    @Column(name="started_at",nullable=false) private OffsetDateTime startedAt;
    private String notes;

    public UUID getId(){return id;} public void setId(UUID id){this.id=id;}
    public UUID getUserId(){return userId;} public void setUserId(UUID u){this.userId=u;}
    public OffsetDateTime getStartedAt(){return startedAt;} public void setStartedAt(OffsetDateTime s){this.startedAt=s;}
    public String getNotes(){return notes;} public void setNotes(String n){this.notes=n;}
}
