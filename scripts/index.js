const initialCards = [
  {
    name: "Beach",
    link: "https://unsplash.com/photos/coconut-tree-on-beach-DH_u2aV3nGM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    name: "Believe",
    link: "https://unsplash.com/photos/toddler-looking-at-believe-in-yourself-graffiti-yMg_SMqfoRU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    name: "Latte",
    link: "https://unsplash.com/photos/cup-of-coffee-on-saucer-with-teaspoon-on-pink-tabletop-X2s8GhnQmds?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    name: "Marylin Monroe",
    link: "https://unsplash.com/photos/woman-in-white-dress-sitting-on-chair-LvJvNPJlu9E?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    name: "Peace",
    link: "https://unsplash.com/photos/woman-doing-yoga-meditation-on-brown-parquet-flooring-NTyBbu66_SI?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
  {
    name: "Sunflower",
    link: "https://unsplash.com/photos/yellow-sunflower-in-bloom-during-daytime-Kh5uDUoXXfU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");

const editModal = document.querySelector("#edit-modal");

const editModalCloseButton = editModal.querySelector(".modal__close-button");

profileEditButton.addEventListener("click", openModal);

editModalCloseButton.addEventListener("click", closeModal);

const profileTitle = document.querySelector(".profile__title");

const editModalTitleInput = editModal.querySelector("#profile-title-input");

const profileDescription = document.querySelector(".profile__description");

const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

function openModal() {
  editModalTitleInput.value = profileTitle.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}
