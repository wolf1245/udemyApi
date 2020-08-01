import React, {Component} from 'react';
import './randomChar.css';
// импортируем класс с fetch
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

export default class RandomChar extends Component {
    constructor()
    {
        super();
        // вызываю метод содержащий класс с промисом и методами
        this.updateChar();
    }

    gotService = new gotService();
    state = {
        char: {},
        loadeng: true,
        error: false
    };

    // метод обработки char, а также отмена установки загрузки для спинера
    onCharLoaded = (char) => {
        // возращаем новый  state  через обьект
        this.setState({
            char,
            loadeng: false
        });
    }

    // ф-я обработки ошибок
    onError = (err) => {
        // новый обьекта state
        this.setState({
            error: true,
            loadeng: false
        })
    }

    // обновление персонажа, + прлучение через айди
    updateChar()
    {
        // рамдомный персонаж от 25 до 140
        const id = Math.floor(Math.random()*140 + 25);
        //  вызываем класс с промисов и передаем айди
        this.gotService.getCharacter(id)
            //обрабатываем возращаемый промис. принимаем возращаемые данные в char
            .then(this.onCharLoaded)
            // обрабатывает ошибку промиса
            .catch(this.onError);
    }

    render() {
        //деструктиризируем наш state
        const {char, loadeng, error} = this.state;

        // проверяем есть ли ошибка
        const errorMessage = error ? <ErrorMessage/> : null;
        //пока true ставим спинер
        const spinner = loadeng ? <Spinner/> : null;
        // проверяем контент
        const content = !(loadeng || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
               {spinner}
               {content}
               {errorMessage}
            </div>
        );
    }
}

// компонент используемый только в randomChar
const View = ({char}) => {
    //вытаскиваем из пропсов компоненты
    const {name, gender, born, died, culture} = char;

    return (
        <>
           <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">{gender} </span>
                    <span>male</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">{born} </span>
                    <span>11.03.1039</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">{died} </span>
                    <span>13.09.1089</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">{culture} </span>
                    <span>Anarchy</span>
                </li>
            </ul> 
        </>
    )
}