const PROFILE_STORAGE_KEY = "perfilAtivo";

const profileLinks = document.querySelectorAll(".profile");

profileLinks.forEach((profileLink) => {
  profileLink.addEventListener("click", () => {
    if (profileLink.dataset.addProfile === "true") {
      return;
    }

    const profileName = profileLink.dataset.profileName;
    const profileImage = profileLink.dataset.profileImage;

    if (!profileName || !profileImage) {
      return;
    }

    const activeProfile = {
      name: profileName,
      image: profileImage.replace("./", "../"),
    };

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(activeProfile));
  });
});
