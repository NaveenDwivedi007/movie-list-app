const api_key = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4669b5900880180081f44bf89bc6cf6a&page=`
// console.log(process.env.APIKEY);
const img_path=`https://image.tmdb.org/t/p/w1280`
const search_url = "https://api.themoviedb.org/3/search/movie?api_key=4669b5900880180081f44bf89bc6cf6a&query="

const form = document.querySelector(".form")
const search = document.querySelector(".search")
const main = document.querySelector(".main")
const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
var page = 1
var totalPage = 


getMovie(api_key)

// with async

// async function getMovie(url){
//   const res = await fetch(url,{
//     method:"GET"
//   })
//   const data =await res.json()

//   return showMovies(data.results);

// }

// with .then and .catch
function getMovie(url){
  return fetch(url,{
        method:"GET"
      })
      .then(res=>res.json())
      .then(data=>{totalPage=data.total_pages;
        return showMovies(data.results)})
      .catch(err=>console.log(err))
}

// showing movie to DOM
function showMovies(movies){
  main.innerHTML=""
  movies.forEach((movie)=>{
    const {title,vote_average,poster_path,overview} = movie

    const movieElement = document.createElement("div")
    movieElement.classList.add("movie")
    movieElement.innerHTML=`
    <img src="${img_path+poster_path}" alt=" " onerror="this.src='https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'">
    <div class="info">
      <h3>${title} </h3>
    <span class="${ratingColor(vote_average)} ">${vote_average} </span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    ${overview}
  </div>`

main.appendChild(movieElement)

  })
}

// search function
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  const searchValue = search.value
   if (searchValue && searchValue!== "" ) {
    getMovie(search_url+searchValue)
    return search.value=""

  }else{
    return window.location.reload()
  }
})

//rating color adding function
function ratingColor(num){
  if (num<5) {
    return "red"
  }
  if (num>=5 && num<=7) {
    return "orange"
  }
  if (num>7) {
    return "green"
  }
}

// navigating the page
next.addEventListener("click",()=>{
  page++
  if (page = totalPage) {
    page=1
  }
  return getMovie(api_key+page)
})

prev.addEventListener("click",()=>{
  page--
  if (page<=0) {
    page=totalPage
  }
  return getMovie(api_key+page)
})



