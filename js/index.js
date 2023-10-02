const handleCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json()

    const tabContainer = document.getElementById('tab-container');

    data.data.news_category.forEach((categories) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${categories.category_id}')" class="tab">${categories.category_name}</a> 
        `;
        tabContainer.appendChild(div);
    });
};

const handleLoadNews = async(categoryId) =>{
    // console.log(categoryId)
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await response.json()
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    const errorMassage = document.getElementById('errorMassage');
    let msg = data?.data;
    if(msg.length === 0){
        errorMassage.innerHTML = ` Here, the total view and author name are null`;
    }
    else{
        errorMassage.innerHTML = ` `;
    }

    data.data?.forEach((news) =>{
        // console.log(news)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-auto bg-base-100 shadow-xl">
                        <figure>
                            <img src=${news?.image_url} alt="Shoes" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">
                                ${news?.title.slice(0,35)}
                                <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
                            </h2>
                            <p>
                                ${news.title}
                            </p>
                            <p> total views: ${news?.total_view?news?.total_view:"no views"}</p>
                            <div class="card-footer flex justify-between mt-8">
                                <div class="flex">
                                    <div>
                                        <div class="avatar online">
                                            <div class="w-14 rounded-full">
                                            <img src=${news?.author.img} alt="Shoes" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6>${news?.author?.name}</h6>
                                        <small>${news?.author?.name}</small>
                                    </div>
                                </div>
                                <div class="card-detaild-btn">
                                    <button
                                        class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        cardContainer.appendChild(div);
    })
}

handleCategory();
handleLoadNews('01');