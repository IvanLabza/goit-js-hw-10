
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { createMarkup } from './markupServise';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';


const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  ifError: document.querySelector('.error'),
  textLoader: document.querySelector('.loader-text'),
};

refs.breedSelect.addEventListener('change', onChooseCatBreed);

refs.loader.classList.remove('is-hidden');
refs.textLoader.classList.remove('is-hidden');
refs.ifError.classList.add('is-hidden');


fetchBreeds()
  .then(data => {

    const catsBreedsId = data.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));

    new SlimSelect({
      select: refs.breedSelect,
      data: catsBreedsId,
    });
  })
  .catch(onError);

function onChooseCatBreed(event) {
  refs.catInfo.innerHTML = '';
  refs.loader.classList.remove('is-hidden');
  refs.textLoader.classList.remove('is-hidden');


  const breedId = event.currentTarget.value;


  fetchCatByBreed(breedId)
    .then(data => {
      refs.loader.classList.add('is-hidden');
      refs.textLoader.classList.add('is-hidden');
      refs.catInfo.innerHTML = createMarkup(data);
    })
    .catch(onError);
}

function onError() {
  refs.loader.classList.remove('is-hidden');
  refs.breedSelect.classList.add('is-hidden');
  refs.textLoader.classList.add('is-hidden');

  Notiflix.Notify.failure(refs.ifError.textContent, {
    position: 'center-top',
    timeout: 5000,
    width: '520px',
    fontSize: '20px',
    cssAnimationStyle: 'from-top',
  });
}
