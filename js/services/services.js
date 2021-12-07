const postData = async (url, data) => { // передаем ссылку на сервер и контент
    const res = await fetch(  // async и await нужны для того, чтобы асинхронный код выполнялся корректно, ибо в данном случае в res не будет ничего приходить async ставим перед аргументами а await перед асинхронными местами 
        url,
        {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: data
        }
    );
        return await res.json();
};

const getResource = async (url) => { // передаем ссылку на сервер и контент
    const res = await fetch(url);
    if (!res.ok) {
       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

        return await res.json();
};

export {postData};
export {getResource};