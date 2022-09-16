// DOM Elements
const postForm = document.getElementById("postForm");
const postsContainer = document.querySelector(".posts");
const nameInput = postForm["name"];
const dateInput = postForm["date"];
const urlInput = postForm["url"];
const commentInput = postForm["comment"];
const filterdate = document.getElementById("date");

var tempDate=2022;
updateContainer(tempDate);

function updateContainer(tempDate)
{

const posts = JSON.parse(localStorage.getItem("posts")) || [];

const addPost = (name, date, url, comment) => {
  posts.push({
    name,
    date,
    url,
    comment,
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  return { name, date, url, comment };
};

const createPostElement = ({ name, date, url, comment }) => {
  // Create elements
  const postDiv = document.createElement("div")
  postDiv.className='listas';
  const postName = document.createElement("h2");
  const postDate = document.createElement("h3");
  const postUrl = document.createElement("img");
  const postComment = document.createElement("h4");

  // Fill the contents
 
    

  if(new Date(date).getFullYear() == tempDate)
  {
    postName.innerText = name;
    postDate.innerText = date;
    postUrl.src = url;
    postComment.innerText = comment;
    // Add to the DOM
    postDiv.append(postName, postDate, postUrl, postComment);
    postsContainer.appendChild(postDiv);

    postsContainer.style.display = posts.length === 0 ? "none" : "flex";
  
  }
  
  
 
};

postsContainer.style.display = posts.length === 1 ? "none" : "flex";

posts.forEach(createPostElement);

postForm.onsubmit = e => {
  e.preventDefault();

  const newPost = addPost(
    nameInput.value,
    dateInput.value,
    urlInput.value,
    commentInput.value
  );

  createPostElement(newPost);

  nameInput.value = "";
  dateInput.value = "";
  urlInput.value = "";
  commentInput.value = "";
};
}


// Date filter not let choose previous date

var date = new Date();
var tdate = date.getDate();
var month = date.getMonth() +1;
if(tdate < 10)
{
    tdate ='0' + tdate;
}
if(month < 10)
{
    month = '0' + month;
}
var year = date.getUTCFullYear();
var minDate = year + "-" + month + "-" + tdate;
filterdate.setAttribute('min', minDate);

// Get selected date from select option

function selectOption()
{
        clearContainer();
    
    var selectedDate = document.getElementById('filter-posts');
    selectedDate.addEventListener('change', function handleChange(event)
    {

        return(event.target.value);
    })

    var a = event.target.value;
    updateContainer(a);
}

//clear container before inserting sorted data by date

function clearContainer()
{
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
 
        document.getElementsByClassName("listas").remove();
}