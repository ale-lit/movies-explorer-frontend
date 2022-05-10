import { BASE_MAIN_URL } from "../constants";

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
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            }
        })
        .catch((err) => console.log(err));
}

// export function getContent(token) {
//     return fetch(`${BASE_MAIN_URL}/users/me`, {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: token,
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => data)
//         .catch((err) => console.log(err));
// }
