const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayCards(data.data.tools);
}

// display all data throw cards
const displayCards = data => {
    // console.log(data);
    data.forEach(element => {
        const { name, image, id, published_in, features } = element;
        const card = document.getElementById('card-container').innerHTML +=
            `
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src=${image} alt="image" /></figure>
            <div class="card-body mt-5">
                <h2 class="card-title">Features</h2>
                    ${features.length > 0 ? features.map(e => `<li>${e}</li>`).join('') : 'No Data Available'}

              <div class="card-actions justify-between place-items-center">
                <div class="grid gap-y-2">
                <h2 class="text-2xl font-bold">${name}</h2>
                <p>
                    <i class="fa-regular fa-calendar-days"></i>
                    ${published_in}
                    </p>
                </div>
                <div class="justify-end">
                <i onClick='details(${id})' class="fa-sharp fa-solid fa-arrow-right cursor-pointer rounded px-5 py-2 bg-red-500"></i>
                </div>
                 </div>
            </div>
        </div>
        
            `

    });
}

// display card details with modal
const details = async(id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(url,res,data);
}