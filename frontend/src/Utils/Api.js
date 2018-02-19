let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const url = 'localhost:3001';

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json; charset=utf-8'
};

export function fetchCategories() {
    return fetch(`http://${url}/categories`, {headers})
        .then((res) => res.json())
}

export function fetchComments(postId) {
    return fetch(`http://${url}/posts/${postId}/comments`, {headers})
        .then((res) => res.json())
}

export function delComment(postId) {
    return fetch(`http://${url}/comments/${postId}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json());
}

export function commentVote(commentId, body) {
    return fetch(`http://${url}/comments/${commentId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then(res => res.json());
}


export function fetchPosts() {
    return fetch(`http://${url}/posts`, {headers})
        .then((res) => res.json())
}

export const newPost = (body) =>
    fetch(`http://${url}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then(res => res.json());


export const update = (post) =>
    fetch(`http://${url}/posts/${post.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(post)
    }).then(res => res.json());

export function findPost(postId) {
    return fetch(`http://${url}/posts/${postId}`, {headers})
        .then((res) => res.json())
}

export function delPost(postId) {
    return fetch(`http://${url}/posts/${postId}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json());
}

export function postVote(postId, body) {
    return fetch(`http://${url}/posts/${postId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then(res => res.json());
}

export const newComment = (body) =>
    fetch(`http://${url}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then(res => res.json());


export const updateCommentApi = (comment) =>
    fetch(`http://${url}/comments/${comment.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(comment)
    }).then(res => res.json());

export function findComment(commentId) {
    return fetch(`http://${url}/comments/${commentId}`, {headers})
        .then(res => {
            console.log(res.ok);
            if(!res.ok) {
                throw Error(res.statusText)
            }
            return res.json();
        });
}