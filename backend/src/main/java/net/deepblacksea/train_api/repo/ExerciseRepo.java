//extending JpaRepository, for CRUD methods without sql
package net.deepblacksea.train_api.repo;

import net.deepblacksea.train_api.model.Exercise;//importing Exercise entity class
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;


public interface ExerciseRepo extends JpaRepository<Exercise, UUID> {
    //find all exercises where user_id IS NULL OR has given userId and sort results by name ascending
    List<Exercise> findByUserIdIsNullOrUserIdOrderByNameAsc(UUID userId);
}
