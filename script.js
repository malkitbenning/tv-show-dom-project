//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}


function searchFilter(episodeList) {
  let searchString = document.getElementById("search-field");
  console.log("value", searchString.value);

  console.log("it's there");
  if (searchString.value.length > 0) {
    if (episodeList[0].name.includes(searchString.value)) {
    }
  }
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  let searchInput = document.createElement("input");
  searchInput.classList.add("search-input");
  searchInput.id = "search-field";
  rootElem.appendChild(searchInput);
  searchInput.addEventListener("input", searchFilter(episodeList));

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
  console.log(episodeList);
}

window.onload = setup;

