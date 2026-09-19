const courtData = [
  {
    site_name: "Devonshire Green Court",
    address: "Devonshire Street",
    district: "City Centre",
    city: "Sheffield",
    postcode: "S1 4GT",
    hoops: 4,
    description:
      "A popular, vibrant urban court right in the heart of Sheffield. Perfect for casual pick-up games, though the surface can get busy on sunny afternoons.",
    image_url:
      "https://plus.unsplash.com/premium_photo-1671436822261-2c99507bfc70?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    site_name: "Endcliffe Park Hoops",
    address: "Rustlings Road",
    district: "Beauchief and Greenhill",
    city: "Sheffield",
    postcode: "S11 7AB",
    hoops: 3,
    description:
      "Set inside a beautiful scenic park. Features a solid outdoor surface with standard steel rims. Great atmosphere for both training and community matches.",
    image_url:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    site_name: "Endcliffe Park Hoops",
    address: "Rustlings Road",
    district: "Hunters Bar",
    city: "Nottingham",
    postcode: "S11 7AH",
    hoops: 6,
    description:
      "Set inside a beautiful scenic park. Features a solid outdoor surface with standard steel rims. Great atmosphere for both training and community matches.",
    image_url:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const searchInput = document.getElementById("court-search");
const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-button");
const container = document.getElementById("court-container");
const feedbackContainer = document.getElementById("search-feedback");

function displayCourts(courts) {
  container.innerHTML = "";
  feedbackContainer.innerHTML = "";

  if (courts.length === 0) {
    feedbackContainer.innerHTML =
      "<p class='search-feedback'>No courts found. Try another city or postcode.</p>";
    container.classList.remove("is-visible");
    return;
  }

  container.classList.add("is-visible");

  courts.forEach((court) => {
    const card = document.createElement("article");
    card.classList.add("court-card");

    card.innerHTML = `
      <img 
        class="court-card__image"
        src="${court.image_url}" 
        alt="Photo of ${court.site_name}"
      >
      <div class="court-card__content">
        <h3 class="court-card__title">${court.site_name}</h3>
        <div class="court-card__meta">
          ${court.address}, ${court.district}<br>
          ${court.city} ${court.postcode}
        </div>
        <p class="court-card__hoops">
          Hoops: ${court.hoops}
        </p>
        <p class="court-card__description">
          ${court.description}
        </p>
      </div>
    `;

    container.appendChild(card);
  });
}

function clearSearch() {
  searchInput.value = "";
  container.innerHTML = "";
  feedbackContainer.innerHTML = "";
  container.classList.remove("is-visible");
  searchInput.focus();
}

function postcodeMatches(postcode, query) {
  const normalizedPostcode = postcode.toLowerCase().trim();
  const normalizedQuery = query.toLowerCase().trim();

  return (
    normalizedPostcode === normalizedQuery ||
    normalizedPostcode.startsWith(`${normalizedQuery} `) ||
    normalizedPostcode.startsWith(`${normalizedQuery}-`)
  );
}

function searchCourts() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    container.innerHTML = "";
    feedbackContainer.innerHTML =
      "<p class='search-feedback'>Please enter a city, district, or postcode.</p>";
    container.classList.remove("is-visible");
    return;
  }

  const filteredCourts = courtData.filter((court) => {
    const searchableFields = [
      court.city,
      court.district,
      court.address,
      court.site_name,
    ];

    const postcodeMatch = postcodeMatches(court.postcode, query);
    const textMatch = searchableFields.some((value) =>
      value.toLowerCase().includes(query),
    );

    return postcodeMatch || textMatch;
  });

  displayCourts(filteredCourts);
}

searchButton.addEventListener("click", searchCourts);
clearButton.addEventListener("click", clearSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchCourts();
  }
});
