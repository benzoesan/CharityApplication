package pl.coderslab.charity.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Min;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Min(1)
    private Integer quantity;
    @ManyToMany
    @Valid
    private List<Category> categories;
    @ManyToOne
    @Valid
    private Institution institution;
    @NotNull
    private String street;
    @NotNull
    private String city;
    @NotNull
    @Pattern(regexp = "^\\d{2}-\\d{3}$", message = "Invalid postal code format. Use XX-XXX format.")
    private String zipCode;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickUpDate;
    private LocalTime pickUpTime;
    @NotNull
    private String pickUpComment;
    @NotNull(message = "Invalid phone number.")
    private String phone;
}
