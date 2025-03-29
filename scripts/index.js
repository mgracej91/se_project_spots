const initialCards = [
  {
    name: "Sunflower Field",
    link: "https://images.unsplash.com/photo-1536633125620-8a3245c11ffa?w=120&dpr=2&h=200&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8c3VuZmxvd2VyJTIwZmllbGR8ZW58MHx8fHwxNzQzMTE0OTQ5fDA&ixlib=rb-4.0.3",
  },
  {
    name: "Cocnut tree near the sea",
    link: "https://images.unsplash.com/photo-1513907404652-d138942b8859?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Water stream through the mountains",
    link: "https://images.unsplash.com/photo-1610997186335-12de8a2dc7fd?q=80&w=1642&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Northern Lights in snowy Alaska",
    link: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Green Valley Mountains",
    link: "https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?q=80&w=1568&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gondola through the city of venice",
    link: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");

const editModal = document.querySelector("#edit-modal");

const editModalForm = editModal.querySelector(".modal__form");

const editModalCloseButton = editModal.querySelector(".modal__close-button");

const profileTitle = document.querySelector(".profile__title");

const editModalTitleInput = editModal.querySelector("#profile-title-input");

const profileDescription = document.querySelector(".profile__description");

const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

function openModal() {
  editModalTitleInput.value = profileTitle.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editModalTitleInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__title");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardNameEl.textContent = data.name;

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}

editModalForm.addEventListener("submit", handleEditModalFormSubmit);
profileEditButton.addEventListener("click", openModal);
editModalCloseButton.addEventListener("click", closeModal);
