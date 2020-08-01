
export default class GotService {
    constructor() {
        // свойство обозначено для других чтоб не менять
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    // самописный метод fetch
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        // обработка ответа промиса
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    // получаем книги
    async getAllBooks() {
        // принимаем в переменную
        const rez = await this.getResource(`/books/`);
        // перебераем и возращаем в обьекте как нам удобно
        return rez.map(this._tranformBook);
    }
    
    // получаем книги по айди
    async getBook(id) {
        // принимаем в переменную 
        const book = await this.getResource(`/books/${id}/`);
        // возращаем в метод
        return this._tranformBook(book);
    }
    
    // получаем характеры
    async getAllCharacters() {
        // записываем возращаемые данные. где говорим чтоб обязательно код дождался
        const rez = await this.getResource(`/characters?page=5&pageSize=10`);
        // перебераем и возращаем в обьекте как нам удобно
        return rez.map(this._tranformCharacter);
    }
    
    // получаем характер по айди
    async getCharacter (id) {
        // принимаем в переменную 
        const character = await this.getResource(`/characters/${id}`);
        // возращаем и передаем в внутерь ф-и
        return this._tranformCharacter(character);
    }
    
    // получаем дома семейств
    async getAllHouses() {
        // принимаем в переменную 
        const rez = await this.getResource(`/houses/`);
        // перебераем и возращаем в обьекте как нам удобно
        return rez.map(this._tranformHouse);
    }
    
    // получаем дом по айди
    async getHouse(id) {
        // принимаем в переменную 
        const house = await this.getResource(`/houses/${id}/`);
        // возращаем в метод
        return this._tranformHouse(house);
    }

    // свойство для state, трансформация данных персонажа
    _tranformCharacter(char)
    {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    //трансформация данных домов
    _tranformHouse(house)
    {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancesrtralWeapons: house.ancesrtralWeapons
        }
    }

    //трансформация данных книг
    _tranformBook(book)
    {
        return {
            name: book.name,
            numberOfPage: book.numberOfPage,
            publiser: book.publiser,
            released: book.released
        }
    }
}