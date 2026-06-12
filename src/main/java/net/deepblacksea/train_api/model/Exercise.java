package net.deepblacksea.train_api.model;
import jakarta.persistence.*;
import java.util.UUID;
@Entity @Table (name = "exercises")
public class Exercise{

    @Id private UUID id;
    @Column(name="user_id") private UUID userId;
    private String name;
    private String category;
    @Column(columnDefinition = "text[]") private String[] tags;
    @Column(name="is_custom") private boolean isCustom;

    public UUID getId() {return id;} public void setId(UUID id){this.id=id;}
    public UUID getUserId(){return userId;} public void setUserId(UUID u){this.userId=u;}
    public String getName(){return name;} public void setName(String n){this.name=n;}
    public String getCategory(){return category;} public void setCategory(String c){this.category=c;}
    public String[] getTags(){return tags;} public void setTags(String[] t){this.tags=t;}
    public boolean isCustom() {return isCustom;} public void setCustom(boolean c){this.isCustom=c;}
}
