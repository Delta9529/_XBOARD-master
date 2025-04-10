const getID = () => Math.random().toString(36).substr(2,9);
console.log("RandomID",getID())


function getAccordion(title,id) {
    return `
    <div class="accordion" id="accordionExample">
    <div class="accordion-item" id=card${id}>
        <h2 class="accordion-header" id=heading${id}>
            <button class="accordion-button" type="button"
            data-bs-toggle="collapse" data-bs-target="#collapse${id}"
            aria-expanded="true" aria-controls="collapse${id}">
                ${title}
            </button>
        </h2>
        <div id="collapse${id}" class="accordion-collapse collapse" data-bs-parent="#accordionId" aria-labelledby="heading${id}">
        </div>
     </div>
     </div>
    `
};



const getCarouselOuter = (id,innerId) => {
    return `
    <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id=${innerId}></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`
}   


const getCarouselItem = (id,active,card) => {
    return `<div class="carousel-item ${active ? "active" : ""}" id="${id}">${card}</div>`;
}

const getCard = (item) => {
    return`
    <div class="card d-block">
    <img src="${item["enclosure"]["link"]}" class="card-img-top img-fluid carousel-img" alt="${item}image not available">
        <div class="card-body">
            <h5 class="card-title">${item["title"]}</h5>
            <p class="card-text">${item["description"]}</p>
            <a href="${item["link"]}" class="btn btn-primary">News Link</a>
        </div>
    </div>`
}



let getContent = async () => {
    for(let  i=0;i<magazines.length;i++){
        const magazineURL = magazines[i]
        console.log("magazine",magazineURL)
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(magazineURL)}`)
        const data = await response.json()
        console.log("data",data)
        const accordionItemID = getID()
        const accordionItem = getAccordion(data.feed.title, accordionItemID)
        console.log("Accordian",accordionItem)
        document.getElementById("accordionId").innerHTML += accordionItem

        if(i===0){
            document.getElementById(`collapse${accordionItemID}`).classList.add("show");
            document.querySelector(`#heading${accordionItemID}>button`).setAttribute("aria-expanded",true)
        }

        const carouselID = getID();
        const carouselInnerID = getID();
        const carousel = getCarouselOuter(carouselID,carouselInnerID)
        document.getElementById(`collapse${accordionItemID}`).innerHTML = carousel

        data.items.forEach((item,itemID) => {
            const card = getCard(item)
            console.log(card);
            const carouselItemID = getID()
            const carouselItem = getCarouselItem(carouselItemID,itemID===0,card);
            document.getElementById(carouselInnerID).innerHTML += carouselItem
        });

    }   
}

getContent()

