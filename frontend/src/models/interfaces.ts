
export interface User {
    idUser : number,
    username: string,
    email: string,
}


export interface Category {
    id: number,
    name: string
}

export interface Source {
    id: number,
    name: string
}

export interface Creator {
    id: number,
    name: string
}

export interface Article {
    id: number,
    title: string,
    articleUrl: string,
    imageUrl: string,
    publishDate: string,
    creators: Creator[],
    category: Category,
    source: Source
}

