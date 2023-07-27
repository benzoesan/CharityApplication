document.addEventListener("DOMContentLoaded", function() {

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          let isValid = true;

          if (this.currentStep === 1) {
            isValid = this.validateStep1(); // Wywołanie walidacji dla kroku 1
          } else if (this.currentStep === 2) {
            isValid = this.validateStep2(); // Wywołanie walidacji dla kroku 2
          } else if (this.currentStep === 3) {
            isValid = this.validateStep3(); // Wywołanie walidacji dla kroku 3
          } else if (this.currentStep === 4) {
            isValid = this.validateStep4(); // Wywołanie walidacji dla kroku 4
          }

          if (isValid) {
            this.currentStep++;
            this.updateForm();
          }
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation



      // if (this.currentStep === 2) {
      //   const quantityInput = document.querySelector("#quantity");
      //   const quantityValue = quantityInput.value.trim(); // Trim whitespace
      //
      //   if (!quantityValue) {
      //     // If quantity is not provided, remove the error class and exit
      //     quantityInput.classList.remove("error");
      //     return;
      //   }
      //
      //   // Check if quantityValue is a valid positive number
      //   if (isNaN(quantityValue) || parseInt(quantityValue) <= 0) {
      //     // If quantity is not a positive number, show an error
      //     quantityInput.classList.add("error");
      //   } else {
      //     // If the quantity is valid, remove the error class
      //     quantityInput.classList.remove("error");
      //   }
      // }

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;

      // TODO: get data from inputs and show them in summary
      this.updateSummary();
    }

    validateStep1() {
      const checkboxes = this.$form.querySelectorAll('input[name="categories"]:checked');
      if (checkboxes.length === 0) {
        alert("Proszę zaznaczyć co chcesz oddać.");
        return false;
      }
      return true;
    }
    // Validation for Step 2: Podaj liczbę 60l worków
    validateStep2() {
      const quantityInput = this.$form.querySelector("#quantity");
      const quantityValue = parseInt(quantityInput.value.trim());
      if (isNaN(quantityValue) || quantityValue <= 0) {
        alert("Proszę podać prawidłową liczbę 60-litrowych worków.");
        return false;
      }
      return true;
    }

    // Validation for Step 3: Wybierz organizację, której chcesz pomóc
    validateStep3() {
      const radioButtons = this.$form.querySelectorAll('input[name="institution"]:checked');
      if (radioButtons.length === 0) {
        alert("Proszę wybrać organizację, której chcesz pomóc.");
        return false;
      }
      return true;
    }

    // Validation for Step 4: Podaj adres oraz termin odbioru rzeczy przez kuriera
    validateStep4() {
      const streetInput = this.$form.querySelector("#street");
      const cityInput = this.$form.querySelector("#city");
      const zipCodeInput = this.$form.querySelector("#zipCode");
      const pickUpDateInput = this.$form.querySelector("#pickUpDate");
      const pickUpTimeInput = this.$form.querySelector("#pickUpTime");

      if (!streetInput.value.trim() || !cityInput.value.trim() || !zipCodeInput.value.trim() || !pickUpDateInput.value.trim() || !pickUpTimeInput.value.trim()) {
        alert("Proszę uzupełnić wszystkie pola w sekcji adresu i terminu odbioru.");
        return false;
      }

      return true;
    }
    updateSummary() {
      // STEP 5: Update summary section with form data
      if (this.currentStep === 5) {
        const quantity = document.getElementById("summary-quantity");
        const institution = document.getElementById("summary-institution");
        const category = document.getElementById("summary-category");
        const summaryStreet = document.getElementById("summary-street");
        const summaryCity = document.getElementById("summary-city");
        const zipCode = document.getElementById("summary-zipCode");
        const pickUpDate = document.getElementById("summary-pickUpDate");
        const pickUpTime = document.getElementById("summary-pickUpTime");
        const pickUpComment = document.getElementById("summary-pickUpComment");

        // Fetch data from input fields
        const quantityValue = document.querySelector("#quantity").value;
        const institutionElement = document.querySelector("[name=institution]:checked");
        const categoryElements = document.querySelectorAll("[name=categories]:checked");
        // Check if the institution element is found and get the title
        //działa
        const institutionValue =  institutionElement.parentElement.querySelector(".title").innerText;
        const categoryValues = [];
        categoryElements.forEach((checkbox) => {
          categoryValues.push(checkbox.parentElement.querySelector(".description").innerText);
        });

        //const categoryValue =  categoryElement.parentElement.querySelector(".description").innerText;

        const streetValue = document.querySelector("#street").value;
        const cityValue = document.querySelector("#city").value;
        const zipCodeValue = document.querySelector("#zipCode").value;
        const pickUpDateValue = document.querySelector("#pickUpDate").value;
        const pickUpTimeValue = document.querySelector("#pickUpTime").value;
        const pickUpCommentValue = document.querySelector("textarea#pickUpComment").value;

        // Update summary section with the fetched data
        quantity.innerText = quantityValue;
        institution.innerText = institutionValue;
        category.innerText = categoryValues.join(", ");
        summaryStreet.innerText = streetValue;
        summaryCity.innerText = cityValue;
        zipCode.innerText = zipCodeValue;
        pickUpDate.innerText = pickUpDateValue;
        pickUpTime.innerText = pickUpTimeValue;
        pickUpComment.innerText = pickUpCommentValue;
      }
    }

  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});
