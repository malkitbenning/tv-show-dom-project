//You can edit ALL of the code here

function fetchAndBuildEpisodes(tvShowNumber) {
  fetch("https://api.tvmaze.com/shows/" + tvShowNumber + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
    })
    .catch((err) => console.log(err));
}

function searchFilter(episodeList) {
  let searchString = document.getElementById("search-field");

  allShows = document.querySelectorAll(".episode-holder");
  showCounter = document.getElementById("search-counter");
  if (searchString.value.length > 0) {
    let showingEpisodeCount = 0;
    for (let i = 0; i < allShows.length; i++) {
      let episodeName = episodeList[i].name;
      let episodeSummary = episodeList[i].summary;
      if (
        episodeName.toLowerCase().includes(searchString.value.toLowerCase()) ||
        episodeSummary.toLowerCase().includes(searchString.value.toLowerCase())
      ) {
        allShows[i].classList.remove("hide-it");
        showingEpisodeCount++;
      } else {
        allShows[i].classList.add("hide-it");
      }
    }
    showCounter.textContent = `Showing ${showingEpisodeCount} episode(s) out of ${episodeList.length}`;
  } else {
    showCounter.textContent = `Showing ${episodeList.length} episode(s) out of ${episodeList.length}`;

    for (let i = 0; i < allShows.length; i++) {
      allShows[i].classList.remove("hide-it");
    }
  }
}

// jump to episode
function jumpToEpisode() {
  let selectList = document.getElementById("selection-list");
  let position = selectList.value;
  let selectedId = "episode-card" + position;
  document.getElementById(selectedId).scrollIntoView();
}

// build selection list dropdown

function buildEpisodeDropdown(showElem, episodeList) {
  let episodeSelectionList = document.createElement("select");
  episodeSelectionList.classList.add("episodes-dropdown");
  episodeSelectionList.id = "selection-list";
  showElem.appendChild(episodeSelectionList);

  for (let i = 0; i < episodeList.length; i++) {
    let optionSeasonPadded = episodeList[i].season.toString().padStart(2, "0");
    let optionEpisodeNumberPadded = episodeList[i].number
      .toString()
      .padStart(2, "0");
    let optionCodeValue =
      "S" + optionSeasonPadded + "E" + optionEpisodeNumberPadded + " - ";
    let optionName = episodeList[i].name;

    let episodeOptionContent = optionCodeValue + optionName;

    let episodeOptionElement = document.createElement("option");
    episodeOptionElement.textContent = episodeOptionContent;
    episodeOptionElement.value = i;
    episodeSelectionList.appendChild(episodeOptionElement);
  }

  let listListener = document.getElementById("selection-list");
  listListener.addEventListener("change", jumpToEpisode);
}

// build search input box

function buildSearchInput(showElem, episodeList) {
  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.id = "search-field";
  showElem.appendChild(searchInput);
  searchInput.addEventListener("input", function () {
    searchFilter(episodeList);
  });
}

// build search counter

function buildSearchCounter(showElem, episodeList) {
  let searchCounterText = document.createElement("span");
  searchCounterText.id = "search-counter";
  showElem.appendChild(searchCounterText);
  searchCounterText.textContent = `Showing ${episodeList.length} episode(s) out of ${episodeList.length}`;
}

// build all episodes

function buildAllEpisodes(showElem, episodeList) {
  let episodesContainer = document.createElement("div");
  episodesContainer.classList.add("episodes-container");
  showElem.appendChild(episodesContainer);

  for (const [i, episode] of episodeList.entries()) {
    let episodeHolder = document.createElement("div");
    episodeHolder.classList.add("episode-holder");
    episodeHolder.id = "episode-card" + i;
    episodesContainer.appendChild(episodeHolder);

    // episode title area

    let episodeTitleArea = document.createElement("div");
    episodeTitleArea.classList.add("episode-title-area");
    episodeHolder.appendChild(episodeTitleArea);

    // episode name

    let episodeName = document.createElement("span");
    episodeName.classList.add("episode-title");
    episodeName.textContent = episode.name;
    episodeTitleArea.appendChild(episodeName);

    // episode code

    let seasonPadded = episode.season.toString().padStart(2, "0");
    let episodeNumberPadded = episode.number.toString().padStart(2, "0");
    let episodeCodeValue = " - S" + seasonPadded + "E" + episodeNumberPadded;
    let episodeCode = document.createElement("span");
    episodeCode.classList.add("episode-title");
    episodeCode.textContent = episodeCodeValue;
    episodeTitleArea.appendChild(episodeCode);

    // image area

    let imageArea = document.createElement("div");
    imageArea.classList.add("image-area");
    episodeHolder.appendChild(imageArea);

    // image - size medium

    let episodeImageMediumURL = episode.image.medium;
    let episodeImageMedium = document.createElement("img");
    episodeImageMedium.classList.add("episode-image-medium");
    episodeImageMedium.src = episodeImageMediumURL;
    episodeImageMedium.alt = "Screenshot from Game of Thrones episode";

    imageArea.appendChild(episodeImageMedium);

    // summary area

    let summaryArea = document.createElement("div");
    summaryArea.classList.add("summary-area");
    episodeHolder.appendChild(summaryArea);

    // episode synopsis

    let episodeSummaryText = episode.summary;
    let episodeSummaryPara = document.createElement("p");
    episodeSummaryPara.classList.add("episode-summary-para");
    // episodeSummaryPara.textContent = episodeSummaryText;
    episodeSummaryPara.innerHTML = episodeSummaryText;
    summaryArea.appendChild(episodeSummaryPara);
  } // close of main episodes FOR loop
}

// build footer

function buildFooter(rootElem) {
  let footerArea = document.createElement("div");
  footerArea.classList.add("footer-area");
  rootElem.appendChild(footerArea);

  // footer para
  let footerURL = "https://www.tvmaze.com/";
  let footerLink = document.createElement("a");
  footerLink.classList.add("footer-link");
  footerLink.href = footerURL;
  footerLink.textContent = "copyright and data source credit to tvmaze.com";
  footerArea.appendChild(footerLink);
}

function makePageForEpisodes(episodeList) {
  const showElem = document.getElementById("show-container");
  showElem.innerHTML = "";
  buildEpisodeDropdown(showElem, episodeList);
  buildSearchInput(showElem, episodeList);
  buildSearchCounter(showElem, episodeList);
  buildAllEpisodes(showElem, episodeList);
}

function buildWelcome(welcomeContainer) {
  const headerElem = document.createElement("h1");
  headerElem.classList.add("header-element");
  headerElem.textContent = "TV Show Episode Guide";
  welcomeContainer.appendChild(headerElem);
  const tagLineElem = document.createElement("p");
  tagLineElem.classList.add("tag-line");
  tagLineElem.textContent = "Episode List breakdown";
  welcomeContainer.appendChild(tagLineElem);
}

function makeComponentsForShows(allShows) {
  const rootElem = document.getElementById("root");
  let welcomeContainer = document.createElement("div");
  rootElem.appendChild(welcomeContainer);
  buildWelcome(welcomeContainer);

  let goBackBtnContainer = document.createElement("div");
  goBackBtnContainer.classList.add("go-back-btn-container");
  rootElem.appendChild(goBackBtnContainer);

  let goBackBtn = document.createElement("button");
  goBackBtn.classList.add("go-back-btn");
  goBackBtn.innerText = "Choose another show";
  goBackBtnContainer.appendChild(goBackBtn);
  goBackBtn.addEventListener("click", () => {
    location.href = `index.html`;
  });

  let tvShowsSelectContainer = document.createElement("div");
  rootElem.appendChild(tvShowsSelectContainer);
  let showContainer = document.createElement("div");
  showContainer.id = "show-container";
  rootElem.appendChild(showContainer);

  buildFooter(rootElem);
}

function setup() {
  const allShows = getAllShows();
  // console.log(allShows);
  allShows.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  // console.log(window.location.search.substring(8));
  let tvShowID = window.location.search.substring(8);

  makeComponentsForShows(allShows);
  fetchAndBuildEpisodes(tvShowID);
}

window.onload = setup;

