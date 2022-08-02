export interface Books {
    id: string,
    public: boolean,
    author: string,
    resume: string,
    title: string,
    subtitle: string,
    image: string,
    url: string,
    category: number[],
    userRegister: string
  }

  export interface BooksResponse{
    count: number;
    items: Books[];
  } 