
// const myForm = document.getElementById("searchForm");

var searchTitleEl = $("#searchTitle");
var searchLocationEl = $("#searchLocation");


/* myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var input = Array.from(document.querySelectorAll("#searchForm input"));
    console.log(input);
});
*/

function searchInput(event) {
    event.preventDefault()
    jobSearch(searchTitleEl.val(), searchLocationEl.val())
}


// web app Id for Arbeit Job Board
 var arbeitAppId = "0610c09006msh8a07c384f45f826p19a862jsnfa5a46a43d73";

// fetch requests for arbeit api for location and title
function jobSearch(jobTitle, jobLocation) {
    var url = `https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api?q=${jobTitle}&${jobLocation}&rapidapi-key=${arbeitAppId}`;
    fetch(url)
        .then(function (response) {
            console.log(response);
            response.json()
                .then(function (data) {
                    console.log(data);
                    jobTitle = data.title;
                    jobLocation = data.location;
                    console.log(data.title);
                    console.log(data.location);
                    // costOfLivingApi(data.location);
                })
        });

    return;
}

jobSearch();


// requests limited so blocked out until ready to test
/* var colAppId = "0610c09006msh8a07c384f45f826p19a862jsnfa5a46a43d73";

function costOfLivingApi(jobLocation) {
    var url = `https://cost-of-living-and-prices.p.rapidapi.com/cities?q=${jobLocation}&rapidapi-key=${colAppId}`;

    fetch(url)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data.cities);
                    jobLocation = data.city
                  //need to find  costOfLiving = data.???
            })
        })
    return;
}
*/
