package net.deepblacksea.train_api.api;

import net.deepblacksea.train_api.api.dto.ExerciseDtos.ExerciseRes;
import net.deepblacksea.train_api.repo.ExerciseRepo;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import static java.util.stream.Collectors.toList;

@RestController //REST controller JSON in/out
@RequestMapping("/exercises") //endpoints here start with /exercises
@CrossOrigin(origins = "http://localhost:5173")
public class ExerciseController {

    private final ExerciseRepo repo;//spring injects repo
    public ExerciseController(ExerciseRepo repo){ this.repo = repo; }
    //temp hard coded current user until real auth
    private static final UUID DEV_USER = UUID.fromString("11111111-1111-1111-1111-111111111111");

    @GetMapping //Get/exercises
    public List<ExerciseRes> list() {

        return repo.findByUserIdIsNullOrUserIdOrderByNameAsc(DEV_USER).stream()
         //^returns both global seeded exercises + any custom exercises owned by DEV_USER
                .map(e -> new ExerciseRes(//db entities maped to API DTOs
                        e.getId(),
                        e.getName(),
                        e.getCategory(),
                        e.getTags(),
                        e.isCustom()
                ))
                .collect(toList());
    }
}
