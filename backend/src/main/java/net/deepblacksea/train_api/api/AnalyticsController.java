package net.deepblacksea.train_api.api;

import net.deepblacksea.train_api.repo.AnalyticsRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    private final AnalyticsRepo analytics;

    public AnalyticsController(AnalyticsRepo analytics) {
        this.analytics = analytics;
    }

    //just temp dev user
    private static final UUID DEV_USER = UUID.fromString("11111111-1111-1111-1111-111111111111");

    @GetMapping("/prs")
    public List<AnalyticsRepo.PrProjection> prs() {
        return analytics.findPrs(DEV_USER);
    }

    @GetMapping("/volume/weekly")
    public List<AnalyticsRepo.WeeklyVolumeProjection> weekly(
            @RequestParam(defaultValue = "12") int weeks) {
        return analytics.weeklyVolume(DEV_USER, weeks);
    }

    @GetMapping("/recent-sessions")
    public List<AnalyticsRepo.RecentSessionProjection> recent(
            @RequestParam(defaultValue = "10") int limit) {
        return analytics.recentSessions(DEV_USER, limit);
    }
}
