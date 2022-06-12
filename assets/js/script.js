var searchInputEl = $("#searchInput");
var searchFormEl = $("#searchForm");
var coinDataContainer = $("#coinContainer");
var searchHistoryEl = $("#previousSearches");
// var search = searchInputEl.val();

function searchInput(event) {
    event.preventDefault()
    coinsListapi(searchInputEl.val())
}

function coinsListapi(coinName) {
    fetch("https://api.coingecko.com/api/v3/coins/" + coinName + "?tickers=true&market_data=true&sparkline=true")
        .then(function (response) {
            response.json()
                .then(function (data) {
                    coinName = data.name;
                    coinIcon = data.image.small;
                    coinSymbol = data.symbol;
                    coinDescription = data.description.en;
                    // console.log(coinName, coinIcon, coinSymbol, coinDescription);
                    displayCurrentData(coinName, coinIcon, coinSymbol);
                    priceData(data.name)
                    dispSearchHist(coinName)

                })
        });

    return;
}

function priceData() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + searchInputEl.val())
        .then(function (response) {
            response.json()
                .then(function (data) {
                    coinPrice = data[0].current_price;
                    console.log(coinPrice);
                    displayCurrentData(data.name, coinIcon, coinSymbol, coinPrice)
            })
    })
}

function displayCurrentData(coinName, coinIcon, coinSymbol, coinPrice) {
    $("#coinName").html(coinName);// coin name
    $("#coinPrice").html(coinPrice);// coin price
    $("#coinSymbol").html(coinSymbol); // coin symbol
    $("#icon").attr("src", `${coinIcon}`); //icon
    $("#description").html(coinDescription); //description
}

function dispSearchHist(coinName, initialStart) {
    var matchFound = false;
    $("previousSearches").children("").each(function () {
        if (coinName == $(this).text()) {
            matchFound = true;
            return;
        }
    });
    if (matchFound) { return; }

    var buttonEL = $("<button type='button' class='col 12 btn'>" + coinName + "</button>")
    buttonEL.on("click", previousButtonClick);
    buttonEL.prependTo(searchHistoryEl);

    if (!initialStart) { savePreviousData(coinName) };
}

function savePreviousData(coinName) {
    tempItem = JSON.parse(localStorage.getItem("previousSearches"))
    if (tempItem != null) {
        localStorage.setItem("previousSearches", JSON.stringify(tempItem.concat(coinName)))
    } else {
        tempArr = [coinName];
        localStorage.setItem("previousSearches", JSON.stringify(tempArr))
    }
}

function previousButtonClick(event) {
    coinsListapi(event.target.innerHTML)
}

function start() {
    searchFormEl.submit(searchInput)
    tempArr = JSON.parse(localStorage.getItem("previousSearches"))
    if (tempArr != null) {
        for (let i = 0; i < tempArr.length; i++) {
            dispSearchHist(tempArr[i], true)
        }
    
    }
}

start()