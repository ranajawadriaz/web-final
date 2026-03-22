function createStarRating(containerId) {
  const container = document.getElementById(containerId);
  const stars = container.querySelectorAll(".star");

  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      // If star is already checked → uncheck only this star
      if (star.classList.contains("checked")) {
        star.classList.remove("checked");
      } else {
        // Check this star and all previous stars
        for (let i = 0; i <= index; i++) {
          stars[i].classList.add("checked");
        }

        // Uncheck all stars after this one
        for (let i = index + 1; i < stars.length; i++) {
          stars[i].classList.remove("checked");
        }
      }
    });
  });
}

createStarRating("star_rating_1");
