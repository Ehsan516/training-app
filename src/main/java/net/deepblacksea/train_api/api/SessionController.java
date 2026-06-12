package net.deepblacksea.train_api.api;

import net.deepblacksea.train_api.api.dto.SessionDtos.*;//importing the request/response types
import net.deepblacksea.train_api.model.Session;
import net.deepblacksea.train_api.model.SetEntry;
import net.deepblacksea.train_api.repo.SessionRepo;
import net.deepblacksea.train_api.repo.SetRepo;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.OffsetDateTime;
import java.util.*;

@RestController
@RequestMapping("/sessions")//all endpoints here start with /sessions
@CrossOrigin(origins = "http://localhost:5173") //alow calls from frontend dev server
public class SessionController {

    private final SessionRepo sessions;//jpa repo for sessions table
    private final SetRepo sets; //jpa repository for the sets table

    public SessionController(SessionRepo sessions, SetRepo sets) {
        this.sessions = sessions;
        this.sets = sets;
    }

    //same hard-coded(temp) user as in ExerciseController
    private static final UUID DEV_USER = UUID.fromString("11111111-1111-1111-1111-111111111111");

    //POST /sessions
    @PostMapping
    public SessionRes create(@RequestBody SessionCreateReq req) {
        // Map request → entity
        Session s = new Session();
        s.setId(UUID.randomUUID());        //generating server-side ID
        s.setUserId(DEV_USER);             // session belongs to the dev user(temp)
        s.setStartedAt(req.startedAt());
        s.setNotes(req.notes());

        sessions.save(s);

        //map entity to response DTO
        return new SessionRes(s.getId(), s.getStartedAt(), s.getNotes());
    }


    //returns all sessions for DEV_USER with their sets
    @GetMapping
    public List<SessionWithSets> list() {
        //fetch sessions for this user most recent first
        return sessions.findByUserIdOrderByStartedAtDesc(DEV_USER).stream()
                //for each session, fetch  sets and map to DTO
                .map(s -> new SessionWithSets(
                        new SessionRes(s.getId(), s.getStartedAt(), s.getNotes()),
                        sets.findBySessionIdOrderByCreatedAtAsc(s.getId()).stream()
                                .map(st -> new SetRes(
                                        st.getId(),
                                        st.getExerciseId(),
                                        st.getReps(),
                                        st.getWeightKg(),
                                        st.getRpe(),
                                        st.getNotes()
                                ))
                                .toList()
                ))
                .toList();
    }


    @PostMapping("/{id}/sets")//POST/sessions/{id}/set
    @Transactional
    public SetRes addSet(@PathVariable("id") UUID sessionId, @RequestBody SetCreateReq req) {
        SetEntry st = new SetEntry();//builds entity from request
        st.setId(UUID.randomUUID());
        st.setSessionId(sessionId);
        st.setExerciseId(req.exerciseId());
        st.setReps(req.reps());
        st.setWeightKg(req.weightKg());
        st.setRpe(req.rpe());
        st.setNotes(req.notes());
        st.setCreatedAt(OffsetDateTime.now());//for ordering sets by timestamp

        sets.save(st);//insert into DB

        return new SetRes(st.getId(), st.getExerciseId(), st.getReps(), st.getWeightKg(), st.getRpe(), st.getNotes());
    }
}
