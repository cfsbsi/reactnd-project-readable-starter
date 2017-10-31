let token = Math.random().toString(36).substr(-8);

const url = 'localhost:3001';

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export function fetchCategories() {
    return fetch(`http://${url}/categories`, {headers})
        .then((res) => res.json())
}