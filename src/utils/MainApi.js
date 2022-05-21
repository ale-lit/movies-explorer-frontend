import { BASE_MAIN_URL } from "../constants";
import { BASE_MOVIES_URL } from "../constants";

export function register(name, password, email) {
    return fetch(`${BASE_MAIN_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
    })
        .then((response) => {
            try {
                return response.json();
            } catch (e) {
                return e;
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
}

export function authorize(email, password) {
    return fetch(`${BASE_MAIN_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
}

export function getUserInfo(token) {
    return fetch(`${BASE_MAIN_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
}

export function getAllSavedMovies() {
    return fetch(`${BASE_MAIN_URL}/movies`, {
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err));
}

export function postMovie(movie) {
    return fetch(`${BASE_MAIN_URL}/movies`, {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            movieId: movie.id,
            nameRU: movie.nameRU || "не указано",
            nameEN: movie.nameEN || "не указано",
            thumbnail: BASE_MOVIES_URL + movie.image.formats.thumbnail.url,
            trailerLink: movie.trailerLink,
            image: BASE_MOVIES_URL + movie.image.url,
            description: movie.description || "не указано",
            year: movie.year,
            duration: movie.duration,
            director: movie.director || "не указано",
            country: movie.country || "не указано",
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err));
}

export function deleteMovie(id) {
    return fetch(`${BASE_MAIN_URL}/movies/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err));
}

export function editUserInfo(name, email) {
    return fetch(`${BASE_MAIN_URL}/users/me`, {
        method: "PATCH",
        headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
        }),
    }).then((res) => {
        return res.json();
    }).catch((err) => console.log(err));
}
