function changePrimaryColor(hue) {
  document
    .querySelector(":root")
    .style.setProperty("--primary-color", `hsl(${hue}deg 100% 50%)`);
}

function walkHueCollors() {
  const step = 3;
  let currentHueColor = step;

  setInterval(() => {
    currentHueColor += step;

    if (currentHueColor >= 360) {
      currentHueColor = 0;
    }

    changePrimaryColor(currentHueColor);
  }, 300);
}

function submitForm() {
  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email")?.value;
  const subject = document.getElementById("subject")?.value;
  const message = document.getElementById("message")?.value;

  if (!(name && email && subject && message)) {
    return;
  }

  const formattedMessage = `
    *Nome*: ${name}
    *Email*: ${email}
    *Assunto*: ${subject}
    *Mensagem*: ${message}
  `.replaceAll(/\n +/g, "\n");

  const url =
    "https://api.whatsapp.com/send?phone=+5531985972616&text=" +
    encodeURIComponent(formattedMessage);

  window.open(url, "_blank");
}

function validaFormulario() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const assunto = document.getElementById("assunto");
  const mensagem = document.getElementById("mensagem");

  const message = `
    \`\`\`
    Nome: ${nome}
    Email: ${email}
    Assunto: ${assunto}
    Mensagem: ${mensagem}
    \`\`\`
  `.replace(/^ +/g, "");

  const url =
    "https://api.whatsapp.com/send?phone=+5531985972616&text=" + message;

  document.querySelector("#sendFormButton").href = url;
}

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
    repos = repos.map(({ name, description, html_url }) => ({
      name,
      description,
      html_url,
    }));

    const html = repos
      .map(
        (repo) => `
          <div class="card">
            <div class="box">
             <a href="${repo.html_url}" target ="_blank">
                <img src="images/github-light.png" alt="imagem do github">
                <div class="text">${repo.name}</div>
                <p>${repo.description}</p>
             </a>
            </div>
          </div>`
      )
      .join("");

    document.querySelector("#projects").innerHTML = html;

    loadCarouselScript();
  });
}

$(document).ready(function () {
  $("#sendFormButton").on("click", submitForm);
  configurePageLayout();
  loadRepos();
  walkHueCollors();
});
