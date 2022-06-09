const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "0610c09006msh8a07c384f45f826p19a862jsnfa5a46a43d73",
        "X-RapidAPI-Host": "arbeitnow-free-job-board.p.rapidapi.com"
    }
};

    fetch("https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api", options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
