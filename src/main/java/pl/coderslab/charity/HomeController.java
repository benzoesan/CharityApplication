package pl.coderslab.charity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.service.DonationService;
import pl.coderslab.charity.service.InstitutionService;

import java.util.List;


@Controller
public class HomeController {
    private InstitutionService institutionService;
    private DonationService donationService;

    public HomeController(InstitutionService institutionService, DonationService donationService) {
        this.institutionService = institutionService;
        this.donationService = donationService;
    }


    @RequestMapping("/")
    public String homeAction(Model model){
        List<Institution> institution = institutionService.findAll();
        model.addAttribute("institutions", institution);
        Long totalDonations = donationService.getTotalQuantityOfDonations();
        model.addAttribute("totalDonations", totalDonations);
        Long totalSupportedInstitutions = donationService.getTotalQuantityOfSupportedInstitutions();
        model.addAttribute("totalSupportedInstitutions", totalSupportedInstitutions);
        return "index";
    }
}
