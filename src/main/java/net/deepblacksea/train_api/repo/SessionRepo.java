//repo for session table
package net.deepblacksea.train_api.repo;

import net.deepblacksea.train_api.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SessionRepo extends JpaRepository<Session, UUID> {
    //recent session by sorting by descending
    List<Session> findByUserIdOrderByStartedAtDesc(UUID userId);
}
