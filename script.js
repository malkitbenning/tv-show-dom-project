//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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

// rootElem.textContent = `Showing ${episodeList.length} episode(s) out of ${episodeList.length}`;

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // search input box

  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.id = "search-field";
  rootElem.appendChild(searchInput);
  searchInput.addEventListener("input", function () {
    searchFilter(episodeList);
  });

  // search counter

  let searchCounterText = document.createElement("span");
  searchCounterText.id = "search-counter";
  rootElem.appendChild(searchCounterText);
  searchCounterText.textContent = `Showing ${episodeList.length} episode(s) out of ${episodeList.length}`;

  // episodes container

  let episodesContainer = document.createElement("div");
  episodesContainer.classList.add("episodes-container");
  rootElem.appendChild(episodesContainer);

  for (episode of episodeList) {
    let episodeHolder = document.createElement("div");
    episodeHolder.classList.add("episode-holder");
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

    // episode summary

    let episodeSummaryText = episode.summary;
    let episodeSummaryPara = document.createElement("p");
    episodeSummaryPara.classList.add("episode-summary-para");
    episodeSummaryPara.textContent = episodeSummaryText;
    summaryArea.appendChild(episodeSummaryPara);
  } // close of main episodes for loop

  // footer area
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

window.onload = setup;

