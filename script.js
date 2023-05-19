//You can edit ALL of the code here

function isInGenres(matchString, genres) {
  let lowerCaseGenres = genres.map((genre) => {
    return genre.toLowerCase();
  });
  return lowerCaseGenres.includes(matchString);
}

function searchFilter(allShows) {
  let searchString = document.getElementById("search-field");
  let showCounter = document.getElementById("search-counter");
  let filteredTVShows = [];

  if (searchString.value.length > 0) {
    filteredTVShows = allShows.filter((aTVShow) => {
      return (
        aTVShow.name.toLowerCase().includes(searchString.value.toLowerCase()) ||
        aTVShow.summary
          .toLowerCase()
          .includes(
            searchString.value.toLowerCase() ||
              isInGenres(searchString.value.toLowerCase(), aTVShow.genres)
          )
      );
    });
    showCounter.textContent = `Found ${filteredTVShows.length} shows`;
  } else {
    filteredTVShows = allShows;
    showCounter.textContent = `Found ${allShows.length} shows`;
  }
  return filteredTVShows;
}

function buildFooter(rootElem) {
  let footerArea = document.createElement("div");
  footerArea.classList.add("footer-area");
  rootElem.appendChild(footerArea);
  let footerURL = "https://www.tvmaze.com/";
  let footerLink = document.createElement("a");
  footerLink.classList.add("footer-link");
  footerLink.href = footerURL;
  footerLink.textContent = "copyright and data source credit to tvmaze.com";
  footerArea.appendChild(footerLink);
}

function navigateToShow(showID) {
  location.href = `oneShow.html?showID=${showID}`;
}

// populate tv shows dropdown
function populateDropdown(tvShowsList) {
  let tvDropdownEl = document.getElementById("tv-shows-dropdown");
  tvDropdownEl.innerHTML = "";
  //add placeholder dropdown item
  let placeholderOption = document.createElement("option");
  placeholderOption.textContent = "please select a show";
  placeholderOption.value = 0;
  tvDropdownEl.appendChild(placeholderOption);

  //add tv shows to dropdown
  for (let i = 0; i < tvShowsList.length; i++) {
    let optionName = tvShowsList[i].name;
    let optionShowId = tvShowsList[i].id;

    let tvShowsOptionEl = document.createElement("option");
    tvShowsOptionEl.textContent = optionName;
    tvShowsOptionEl.value = optionShowId;
    tvDropdownEl.appendChild(tvShowsOptionEl);
  }

  let tvShowsListener = document.getElementById("tv-shows-dropdown");
  tvShowsListener.addEventListener("change", () => {
    navigateToShow(tvShowsListener.value);
  });
}

function buildWelcome(rootElem) {
  let welcomeContainer = document.createElement("div");
  rootElem.appendChild(welcomeContainer);
  const headerElem = document.createElement("h1");
  headerElem.classList.add("header-element");
  headerElem.textContent = "TV Show Guide";
  welcomeContainer.appendChild(headerElem);
  const tagLineElem = document.createElement("p");
  tagLineElem.classList.add("tag-line");
  tagLineElem.textContent =
    "Choose a tv show from the list to see an episode breakdown";
  welcomeContainer.appendChild(tagLineElem);
}

// build search input box

function buildSearchInput(rootElem, allShows) {
  let searchTitle = document.createElement("span");
  rootElem.appendChild(searchTitle);
  searchTitle.textContent = "Filtering for...";
  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.id = "search-field";
  rootElem.appendChild(searchInput);
  searchInput.addEventListener("input", function () {
    let filteredTVShowsList = searchFilter(allShows);
    //rebuild dropdown with filtered list
    populateDropdown(filteredTVShowsList);
    //rebuild tv series listing with filtered list
    populateTVSeriesArea(filteredTVShowsList);
  });
}

function makeASeriesCard(tvSeriesContainer, tvShow) {
  let tvShowCard = document.createElement("div");
  tvShowCard.classList.add("tv-show-card");
  tvShowCard.id = "tv-" + tvShow.id;
  tvShowCard.addEventListener("click", () => {
    navigateToShow(tvShow.id);
  });
  tvSeriesContainer.appendChild(tvShowCard);

  // tvShow name
  let tvShowName = document.createElement("h2");
  tvShowName.classList.add("tv-show-title");
  tvShowName.textContent = tvShow.name;
  tvShowCard.appendChild(tvShowName);

  // tvShow details area
  let tvShowDetailsArea = document.createElement("div");
  tvShowDetailsArea.classList.add("tv-show-details-area");
  tvShowCard.appendChild(tvShowDetailsArea);

  // image area
  let tvShowImageArea = document.createElement("div");
  tvShowImageArea.classList.add("tv-show-image-area");
  tvShowDetailsArea.appendChild(tvShowImageArea);

  // image - size medium

  let tvShowImageMediumURL = tvShow.image.medium;
  let tvShowImageMedium = document.createElement("img");
  tvShowImageMedium.classList.add("tv-show-image-medium");
  tvShowImageMedium.src = tvShowImageMediumURL;
  tvShowImageMedium.alt = "Screenshot from tv show";
  tvShowImageArea.appendChild(tvShowImageMedium);

  // tv show summary area

  let tvShowSummaryArea = document.createElement("div");
  tvShowSummaryArea.classList.add("tv-show-summary-area");
  tvShowDetailsArea.appendChild(tvShowSummaryArea);

  // tv show synopsis

  let tvShowSummaryText = tvShow.summary;
  let tvShowSummaryPara = document.createElement("p");
  tvShowSummaryPara.classList.add("tv-show-summary-para");
  tvShowSummaryPara.innerHTML = tvShowSummaryText;
  tvShowSummaryArea.appendChild(tvShowSummaryPara);

  // tv show info area

  let tvShowInfoArea = document.createElement("div");
  tvShowInfoArea.classList.add("tv-show-info-area");
  tvShowDetailsArea.appendChild(tvShowInfoArea);

  // tv show rating
  let tvShowRatingPara = document.createElement("p");
  tvShowRatingPara.classList.add("tv-show-info-para");
  tvShowRatingPara.textContent = "Rated: " + tvShow.rating.average;
  tvShowInfoArea.appendChild(tvShowRatingPara);

  // tv show genres title
  let tvShowGenreTitle = document.createElement("p");
  tvShowGenreTitle.classList.add("tv-show-info-para");
  tvShowGenreTitle.textContent = "Genres: ";
  tvShowInfoArea.appendChild(tvShowGenreTitle);

  // tv show genres list
  let tvShowGenreList = document.createElement("ul");
  tvShowInfoArea.appendChild(tvShowGenreList);

  for (j = 0; j < tvShow.genres.length; j++) {
    let tvShowGenreListItem = document.createElement("li");
    tvShowGenreListItem.textContent = tvShow.genres[j];
    tvShowGenreList.appendChild(tvShowGenreListItem);
  }

  // tv show status
  let tvShowStatusPara = document.createElement("p");
  tvShowStatusPara.classList.add("tv-show-info-para");
  tvShowStatusPara.textContent = "Status: " + tvShow.status;
  tvShowInfoArea.appendChild(tvShowStatusPara);

  // tv show runtime
  let tvShowRuntimePara = document.createElement("p");
  tvShowRuntimePara.classList.add("tv-show-info-para");
  tvShowRuntimePara.textContent = "Runtime: " + tvShow.runtime + "mins";
  tvShowInfoArea.appendChild(tvShowRuntimePara);
}

//tv series cards container
function buildTVSeriesArea(rootElem) {
  let tvSeriesContainer = document.createElement("div");
  tvSeriesContainer.id = "series-container";
  tvSeriesContainer.classList.add("tv-series-container");
  rootElem.appendChild(tvSeriesContainer);
}

//dropdown list area
function buildTVDropdown(rootElem, allShows) {
  let tvShowsSelectArea = document.createElement("div");
  tvShowsSelectArea.id = "tv-series-select-area";
  rootElem.appendChild(tvShowsSelectArea);
  let tvShowsDropdownEl = document.createElement("select");
  tvShowsDropdownEl.classList.add("shows-dropdown");
  tvShowsDropdownEl.id = "tv-shows-dropdown";
  tvShowsSelectArea.appendChild(tvShowsDropdownEl);
}

//search counter
function buildCounter(tvShowsList) {
  let tvShowsSelectArea = document.getElementById("tv-series-select-area");
  let searchCounterText = document.createElement("span");
  searchCounterText.id = "search-counter";
  tvShowsSelectArea.appendChild(searchCounterText);
  searchCounterText.textContent = `Found ${tvShowsList.length} shows`;
}

function populateTVSeriesArea(tvShowsList) {
  let tvSeriesContainer = document.getElementById("series-container");
  tvSeriesContainer.innerHTML = "";
  for (i = 0; i < tvShowsList.length; i++) {
    makeASeriesCard(tvSeriesContainer, tvShowsList[i]);
  }
}

function makeComponentsForShows(allShows) {
  const rootElem = document.getElementById("root");

  buildWelcome(rootElem);
  buildSearchInput(rootElem, allShows);
  buildTVDropdown(rootElem, allShows);
  buildCounter(allShows);
  buildTVSeriesArea(rootElem, allShows);
  populateDropdown(allShows);
  populateTVSeriesArea(allShows);
  buildFooter(rootElem);
}

function cleanShowsArray(rawAllShows) {
  let allShows = rawAllShows.filter((aShow) => {
    return aShow.image;
  });
  return allShows;
}

function setup() {
  const rawAllShows = getAllShows();
  const allShows = cleanShowsArray(rawAllShows);
  allShows.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  makeComponentsForShows(allShows);
}

window.onload = setup;

