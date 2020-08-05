// get github username input form
const githubUserForm= document.getElementById('githubUserForm');

// listen for submmision on input form
githubUserForm.addEventListener('submit', (e) => {
    // prevent default form submission
    e.preventDefault();

    //  get github username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // get the value of the github username input field
    let githubUsername = usernameInput.value;

    // hithub API passing in the github username
    requestUserRepos(githubUserForm);
})

// github API call request function
function requestUserRepos(username){
    // create XMLHTTpRequest object
    const xmlHttpR = new XMLHTTpRequest();

    // github endpoint passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;

     // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xmlHttpR.open('GET', url, true);

    // request processed
    xmlHttpR.onload = function () {
        // parse API data into JSON
        const data = JSON.parse(this.response);

         // loop over each object in data array
         for (let i in data) {

            // get the ul tag with userRepos id
            let ul = document.getElementById('userRepos');
    
            // create variable that will create li's to be added to ul
            let li = document.createElement('li');
            
            // add list item class to each li
            li.classList.add('list-group-item')
        
            // create the html markup for each li
            li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);
            
            // append each li to the ul
            ul.appendChild(li);
        
        }

    }
    
    // send the request to the server
    xmlHttpR.send();
    }
}