import "./index.css";
import Logo from "../images/Logo.svg";
import avatar from "../images/avatar.jpg";
import pencil from "../images/pencil.svg";
import plus from "../images/plus.svg";
import Api from "../utils/Api.js";
import pic from "../images/edit-avatar.svg";

import {
  enableValidation,
  resetValidation,
  settings,
  disabledButton,
} from "../scripts/validation.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerLogo = document.querySelector(".header__logo");
  const profileAvatar = document.querySelector(".profile__avatar");
  const editButtonImage = document.querySelector(".profile__edit-button img");
  const newPostButtonImage = document.querySelector(
    ".profile__newpost-button img"
  );
  const editAvatar = document.querySelector(".profile__avatar-edit");

  headerLogo.src = Logo;
  profileAvatar.src = avatar;
  editButtonImage.src = pencil;
  newPostButtonImage.src = plus;
  editAvatar.src = pic;
});

const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "f6c1a9da-fc55-44bb-a3ff-1c31fae8dd86",
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    console.log([cards]);
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const profileEditButton = document.querySelector(".profile__edit-button");

const editModal = document.querySelector("#edit-modal");

const editModalForm = editModal.querySelector(".modal__form--validate");

const editModalCloseButton = editModal.querySelector(".modal__close-button");

const profileAvatar = document.querySelector(".profile__avatar");

const avatarModal = document.querySelector("#avatar-modal");

const avatarForm = avatarModal.querySelector("#edit-avatar-form");

const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const avatarModalButton = document.querySelector(".profile__avatar-btn");

const avatarCloseButton = avatarModal.querySelector(".modal__close-button");

const profileTitle = document.querySelector(".profile__title");

const editModalTitleInput = editModal.querySelector("#profile-title-input");

const profileDescription = document.querySelector(".profile__description");

const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

const postModal = document.querySelector("#post-modal");

const newPostButton = document.querySelector(".profile__newpost-button");

const postModalCloseButton = postModal.querySelector(".modal__close-button");

const postModalForm = postModal.querySelector(".modal__form--validate");

const postSubmitButton = postModal.querySelector(".modal__save-button");

const postLinkInput = postModal.querySelector("#post-link-input");

const postCaptionInput = postModal.querySelector("#post-caption-input");

const previewModal = document.querySelector("#preview-modal");

const previewModalImageEl = previewModal.querySelector(".modal__image");

const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const modalClosePreview = previewModal.querySelector(
  ".modal__close-button_type_preview"
);

const modalCloseOverlay = document.querySelectorAll(".modal");

const deleteModal = document.querySelector("#delete-modal");

const deleteForm = document.querySelector("#delete-form");

const btnDelete = deleteModal.querySelector(".modal__button-delete");

const btnCancel = deleteModal.querySelector(".modal__button-cancel");

const closeDeleteModal = deleteModal.querySelector(".modal__close-button");

let selectedCard, selectedCardId;

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEditModalFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  console.log(submitBtn);
  api
    .editUserInfo({
      name: editModalTitleInput.value,
      about: (profileDescription.textContent = editModalDescriptionInput.value),
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)

    .finally(() => {
      submitBtn.textContent = "Delete";
    });
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardNameEl.textContent = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function handleLike(evt, id) {
  let isLiked = evt.target.classList.contains("card__like-button_liked");

  api
    .likeStatus(id, isLiked)
    .then(() => {
      if (isLiked) {
        return evt.target.classList.remove("card__like-button_liked");
      } else {
        evt.target.classList.add("card__like-button_liked");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function handlePostSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  api
    .newCard({ link: postLinkInput.value, name: postCaptionInput.value })
    .then((data) => {
      postCaptionInput.value = "";
      postLinkInput.value = "";
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      postModalForm.reset();
      disabledButton(postSubmitButton, settings);
      closeModal(postModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
  const avatarUrl = avatarInput.value;
  api
    .newAvatar(avatarUrl)
    .then((url) => {
      avatarInput.value = "";
      const avatarElement = document.querySelector(".profile__avatar");
      avatarElement.src = url.avatar;
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

editModalForm.addEventListener("submit", handleEditModalFormSubmit);

profileEditButton.addEventListener("click", () => {
  resetValidation(editModalForm, settings);
  editModalTitleInput.value = profileTitle.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

const handleCloseModal = (evt) => {
  if (evt.target.classList.contains("modal")) {
    evt.target.classList.remove("modal_opened");
  }
};

modalCloseOverlay.forEach((modal) => {
  modal.addEventListener("click", handleCloseModal);
});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

newPostButton.addEventListener("click", () => {
  openModal(postModal);
});

modalClosePreview.addEventListener("click", () => {
  closeModal(previewModal);
});

postModalCloseButton.addEventListener("click", () => {
  closeModal(postModal);
});

btnDelete.addEventListener("click", () => {
  closeModal(deleteModal);
});

btnCancel.addEventListener("click", () => {
  closeModal(deleteModal);
});

closeDeleteModal.addEventListener("click", () => {
  closeModal(deleteModal);
});

postModalForm.addEventListener("submit", handlePostSubmit);

avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
