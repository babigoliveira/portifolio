function setupCarousel() {
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
}

function configurePageLayout() {
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
  });

  new Typed(".typing", {
    strings: ["Desenvolvedora", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  new Typed(".typing-2", {
    strings: ["Desenvolvedora", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });
}

function loadCarouselScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";
  script.onload = setupCarousel;
  document.head.appendChild(script);
}

function loadRepos() {
  $.ajax({
    url: "https://api.github.com/users/babigoliveira/repos",
    dataType: "json",
    async: true,
  }).then((repos) => {
    repos = repos.map(({ description, html_url, name }) => ({
      description,
      html_url,
      name,
    }));

    const html = repos
      .map(
        (repo) => `
          <div class="card">
            <div class="box">
              <img src="images/github-light.png" alt="">
              <div class="text">${repo.name}</div>
              <p>${repo.description}</p>
            </div>
          </div>`
      )
      .join("");

    document.querySelector("#projects").innerHTML = html;

    loadCarouselScript();
  });
}

$(document).ready(function () {
  configurePageLayout();
  loadRepos();
});
