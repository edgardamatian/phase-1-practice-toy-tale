let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    const toysContainer = document.getElementById('toy-collection');
  console.log (toysContainer)

    data.forEach(toy => {
      const card = document.createElement('div');
      card.classList.add('card');

      const name = document.createElement('h2');
      name.textContent = toy.name;

      const image = document.createElement('img');
      image.src = toy.image;
      image.classList.add('toy-avatar');

      const likes = document.createElement('p');
      likes.textContent = `Likes: ${toy.likes}`;

      const likeButton = document.createElement('button');
      likeButton.classList.add('like-btn');
      likeButton.setAttribute('id', toy.id);
      likeButton.textContent = 'Like';

      card.appendChild(name);
      card.appendChild(image);
      card.appendChild(likes);
      card.appendChild(likeButton);

      toysContainer.appendChild(card);
      let currentLikes = toy.likes 
      likeButton.addEventListener("click", () => {
        const toyId = toy.id

    console.log (toyId)

currentLikes +=1   

console.log (currentLikes)

        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": currentLikes
          })
        })
        .then (response=>response.json())
        .then (updatedToy=>{
          likes.textContent = `Likes: ${updatedToy.likes}`;
        })
      })
    });
  })

  const addToyForm = document.querySelector(".add-toy-form")
  addToyForm.addEventListener("submit",(e)=> {
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: 'Jessie',
        image: 'https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist',
        likes: 0
      })
    })
  })