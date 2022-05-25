const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = `https://emilbacklund.flywheelsites.com/wp-json/wp/v2/posts/${id}?acf_format=standard`;

const artistName = document.querySelector(".artist-name");
const mainImage = document.querySelector(".main-picture");
const paragraph1 = document.querySelector(".paragraph_1");
const paragraph2 = document.querySelector(".paragraph_2");
const secImg1 = document.querySelector(".secondary-image_1");
const secImg2 = document.querySelector(".secondary-image_2");
const email = document.querySelector(".email");
const phoneNumber = document.querySelector(".phone-number");
const links = document.querySelector(".links");
const social = document.querySelector(".social");

async function fetchDetails() {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    const userDetail = jsonData.acf;

    console.log(userDetail);

    document.title = `Focusart | ${userDetail.artist_name}`;

    artistName.innerHTML = `${userDetail.artist_name}`;
    mainImage.src = `${userDetail.main_image.url}`;
    paragraph1.innerHTML = `${userDetail.paragraph}`;
    paragraph2.innerHTML = `${userDetail.paragraph2}`;
    secImg1.src = `${userDetail.secondary1_image.url}`;
    secImg2.src = `${userDetail.secondary2_image.url}`;

    if (!userDetail.email) {
      email.innerHTML = `N/A`;
      email.attributes.href.nodeValue = "";
      email.style.pointerEvents = "none";
    } else {
      email.innerHTML = `${userDetail.email}`;
      email.attributes.href.nodeValue = `mailto: ${userDetail.email}`;
    }

    if (!userDetail.number) {
      phoneNumber.innerHTML = `N/A`;
      phoneNumber.attributes.href.nodeValue = "";
      phoneNumber.style.pointerEvents = "none";
    } else {
      phoneNumber.innerHTML = `${userDetail.number}`;
      phoneNumber.attributes.href.nodeValue = `tel:${userDetail.number}`;
    }

    const allLinks = `<a href="${userDetail.link1}" target="_blank">${userDetail.link1}</a>
    <a href="${userDetail.link2}" target="_blank">${userDetail.link2}</a>
    <a href="${userDetail.link3}" target="_blank">${userDetail.link3}</a>
    <a href="${userDetail.link4}" target="_blank">${userDetail.link4}</a>
    <a href="${userDetail.link5}" target="_blank">${userDetail.link5}</a>`;

    links.innerHTML = `
    <p class="emph-text">Links:</p>
    ${allLinks}
    `;

    const allAnchorTags = document.querySelectorAll(".links a");

    for (let removeEmpty of allAnchorTags) {
      if (removeEmpty.innerHTML === "") {
        removeEmpty.parentNode.removeChild(removeEmpty);
      }
    }
  } catch (error) {}
}

fetchDetails();