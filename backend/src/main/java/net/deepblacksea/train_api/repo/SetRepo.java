//repo for sets table
package net.deepblacksea.train_api.repo;

import net.deepblacksea.train_api.model.SetEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SetRepo extends JpaRepository<SetEntry, UUID> {
    List<SetEntry> findBySessionIdOrderByCreatedAtAsc(UUID sessionId);
}
