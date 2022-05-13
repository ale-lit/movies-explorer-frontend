import { BASE_MOVIES_URL } from "../constants";

export function getAllMovies() {
    return fetch(`${BASE_MOVIES_URL}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => data)
        .catch((err) => console.log(err));
}
