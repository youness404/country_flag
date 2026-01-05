import {countries} from './data.js';
const inputText = document.getElementById('input_text');
const getFlagBtn = document.getElementById('get_flagBtn');
const imageContainer = document.querySelector('.image_container');
const flagImage = document.createElement('img')
;
const notFoundError = document.createElement('p');
flagImage.className = 'w-full h-full object-cover hidden';
flagImage.alt = 'Country image';
imageContainer.appendChild(flagImage);
getFlagBtn.addEventListener('click',async()=>{
    const countryName = inputText.value.trim();

    const country = countries.find(c=>c.name.toLowerCase()===countryName.toLowerCase());
    if(country){
        fetchCountryFlag(country);
    }else{
        if(imageContainer.contains(flagImage)){
            imageContainer.removeChild(flagImage);
        }
        imageContainer.appendChild(notFoundError);
        notFoundError.textContent='Country not found !';
        notFoundError.className='text-red-500 text-xl';
        setTimeout(()=>{
            notFoundError.className='hidden';
        },2000)
    }
    inputText.value='';
})

// fetch the country flag
async function fetchCountryFlag(country) {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/countryflag?country=${country.code}`,{
            method : 'GET',
            headers : {
                'X-Api-Key': 'Your Api Key'
            }
        });
        const data = await response.json();
        flagImage.src = data.square_image_url;
        flagImage.onload = () => {
            flagImage.classList.remove('hidden');
        }
    } catch (error) {
        console.error(error);
    }
}

