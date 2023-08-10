function Loading(status = true) {
    const Loading = document.querySelector('#Loading');

    if (status) {
        return (Loading.style = 'display: flex');
    } else {
        Loading.style = 'display: none';
    }
}

export default Loading;
