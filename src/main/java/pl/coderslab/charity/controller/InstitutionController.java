//package pl.coderslab.charity.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import pl.coderslab.charity.entity.Institution;
//import pl.coderslab.charity.repository.InstitutionRepository;
//
//import java.util.List;
//
//@Controller
//public class InstitutionController {
//    private InstitutionRepository institutionRepository;
//
//    public InstitutionController(InstitutionRepository institutionRepository) {
//        this.institutionRepository = institutionRepository;
//    }
//
//    @GetMapping("/institution")
//    public String wyswietlFundacje(Model model) {
//        List<Institution> institution = institutionRepository.findAll();
//        model.addAttribute("institution", institution);
//        return "institution";
//    }
//}
