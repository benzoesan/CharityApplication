package pl.coderslab.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import pl.coderslab.charity.entity.Category;
import pl.coderslab.charity.entity.Donation;
import pl.coderslab.charity.entity.Institution;
import pl.coderslab.charity.service.CategoryService;
import pl.coderslab.charity.service.DonationService;
import pl.coderslab.charity.service.InstitutionService;

import javax.validation.Valid;
import java.util.List;

@Controller
public class DonationController {


    private final DonationService donationService;
    private final CategoryService categoryService;
    private final InstitutionService institutionService;


    @Autowired
    public DonationController(DonationService donationService, CategoryService categoryService, InstitutionService institutionService) {
        this.donationService = donationService;
        this.categoryService = categoryService;
        this.institutionService = institutionService;
    }


    @GetMapping("/donation")
    public String showDonationForm(Model model) {

        Donation donation = new Donation();
        model.addAttribute("donation", donation);

        return "form";
    }

    @PostMapping("/donation")
    public String submitDonationForm(@ModelAttribute("donation") @Valid Donation donation, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return "form";
        }
        donationService.save(donation);
        return "form-confirmation";
    }

    @ModelAttribute("institutions")//powtórz
    public List<Institution> institutions(){
        return institutionService.findAll();
    }

    @ModelAttribute("categories")
    public List<Category> categories(){
        return categoryService.findAll();
    }
}
