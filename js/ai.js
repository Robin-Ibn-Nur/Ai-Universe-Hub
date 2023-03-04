
let fetchAllData = [];

const loadData = async (fetchAllData) => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    fetchAllData = data.data.tools;
    displayCards(data.data.tools, fetchAllData);
};

const displayCards = (data, fetchAllData) => {
    const seeMoreButton = document.getElementById("seeMore");
    let cards = [];

    if (data.length > 6) {
        cards = data.slice(0, 6);
        seeMoreButton.classList.remove("hidden");
    } else {
        cards = data;
        seeMoreButton.classList.add("hidden");
    }

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    cards.forEach((element) => {
        const { name, image, id, published_in, features } = element;
        const card = `
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="${image}" alt="image" />
        </figure>
        <div class="card-body mt-5">
          <h2 class="card-title">Features</h2>
          ${features.length > 0
                ? `${features.map((e) => `<li>${e}</li>`).join("")}`
                : "No Data Available"}
          <div class="card-actions justify-between place-items-center">
            <div class="grid gap-y-2">
              <h2 class="text-2xl font-bold">${name}</h2>
              <p>
                <i class="fa-regular fa-calendar-days"></i>
                ${published_in}
              </p>
            </div>
            <div class="justify-end">
              <label for="my-modal-6">
                <i
                  onClick="fetchDetails('${id}')"
                  class="fa-sharp fa-solid fa-arrow-right cursor-pointer rounded px-5 py-2 bg-red-500"
                ></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    `;
        cardContainer.innerHTML += card;
    });
};

const sortByDate = () => {
    fetchAllData.sort(
        (a, b) => new Date(b.published_in) - new Date(a.published_in)
    );
    displayCards(fetchAllData);
};

// display card details with modal
const fetchDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    modal(data.data);
};
const modal = (modalData) => {
    console.log(modalData);
    const {
        tool_name,
        pricing,
        description,
        accuracy,
        features,
        integrations,
        image_link,
        input_output_examples,
    } = modalData;
    const modalDiv = (document.getElementById('modalDetails').innerHTML = `
    <div class="main grid sm:grid-cols-1 md:grid-cols-2 justify-between mt-7">
      <div class="outline outline-offset-2 outline-red-400 rounded bg-red-100 mr-3">
        <p>${description}</p>
        <div class="flex justify-around my-8 mx-auto">
          <div class="border rounded bg-gray-50">
            <p>${pricing[0].price}</p> </br>
            <p>${pricing[0].plan}</p>
          </div>
          <div class="border rounded bg-gray-50">
            <p>${pricing[1].price}</p> </br>
            <p>${pricing[1].plan}</p>
          </div>
          <div class="border rounded bg-gray-50">
            <p>${pricing[2].price}</p> </br>
            <p>${pricing[2].plan}</p>
          </div>
        </div>
        <div class="flex justify-around">
          <div>
            <h3>Features</h3>
            <li>${features[0] ? features[0] : "No Data Available"}</li>
            <li>${features[1] ? features[1] : "No Data Available"}</li>
            <li>${features[2] ? features[2] : "No Data Available"}</li>



          </div>
          <div>
            <h3>Integrations</h3>
            ${integrations.map(integration => `<li>${integration ? integration : "No Data Available"}</li>`).join('')}
          </div>
        </div>
      </div>
      <div class="relative border">
        <img class="h-52 rounded" src=${image_link[0]} alt="">
        <p class="text-center text-sm bg-red-500 rounded absolute top-0 right-0">${accuracy
            .score * 100}% accuracy</p>
        <h3 class="text-lg text-center">${input_output_examples[0].input ? input_output_examples[0].input : "No Data Available"}</h3>
        <p class="text-xs text-center">${input_output_examples[0].output ? input_output_examples[0].output : "No Data Available"}</p>
      </div>
    </div>
    <div class="h-2 w-2 modal-action absolute -top-6 -right-0">
      <label for="my-modal-6" class="btn btn-circle btn-outline hover:bg-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </label>
    </div>
  `);
};


// seeMore data onclick
document.getElementById('moreCards').addEventListener('click', function () {
    loadData(data.length)
})


// loader
const loader = isLoading => {
    const wrapper = document.getElementById('wrapper');
    if (isLoading) {
        wrapper.classList.remove('hidden')
    }
}