package net.deepblacksea.train_api.api.dto;
import java.util.UUID;
public class ExerciseDtos {
    public record ExerciseRes(UUID id, String name, String category, String[] tags, boolean isCustom){}
}
