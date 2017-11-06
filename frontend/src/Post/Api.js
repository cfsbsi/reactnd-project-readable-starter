let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const url = 'localhost:3001';

const headers = {
    'Accept': 'application/json',
    'Authorization': 'chris',
    'Content-Type': 'application/json; charset=utf-8'
};

export function fetchPosts() {
    return fetch(`http://${url}/posts`, {headers})
        .then((res) => res.json())
}

export const create = (body) =>
    fetch(`http://${url}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then(res => res.json());

export function findPost(postId) {
    return fetch(`http://${url}/posts/${postId}`, {headers})
        .then((res) => res.json())
}
