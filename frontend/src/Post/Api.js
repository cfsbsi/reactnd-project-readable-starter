let token = Math.random().toString(36).substr(-8);

const url = 'localhost:3001';

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};

export function fetchPosts() {
    return fetch(`http://${url}/posts`, {headers})
        .then((res) => res.json())
}