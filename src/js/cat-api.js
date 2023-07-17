import { catApi } from './api';

export function fetchBreeds() {
  return catApi.get(`breeds`).then(response => {
    return response.data;
  });
}
export function fetchCatByBreed(breedId) {
  return catApi
    .get(`images/search`, {
      params: {
        breed_ids: breedId,
      },
    })
    .then(response => {
      return response.data;
    });
}
