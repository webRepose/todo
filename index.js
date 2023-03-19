"use strict";

const check = JSON.parse(localStorage.getItem('todo'));
let todoArray;
if(check !== null) todoArray = check;
else todoArray = [];


let inText;
const input = document.querySelector('input');
input.addEventListener('input', () => {
    if (input.value.length >= 90) return false;
    inText = input.value;
})

input.focus();

let text;
document.querySelector('form').addEventListener('submit', (e) => {
    text = inText;
    if(text.length <= 3) return false;
    input.value = '';

    let todoData =
    {
        text: text
    };

    todoArray.push(todoData);
    window.localStorage.setItem('todo', JSON.stringify(todoArray));

})


    let checkTodo = JSON.parse(localStorage.getItem('todo'));
    let todoArray2 = checkTodo;
    if(checkTodo!==null) {
        for(let i = 0;i<checkTodo.length;i++) {
            document.querySelector('div.todo_list')
            .insertAdjacentHTML('beforeend', 
            `
            <div class="todo_list_block">
            <div class="todo_list_block__id">
                <p>${i + 1}</p>
            </div>

            <div class="todo_list_block__text">
                <p>${checkTodo[i].text}</p>
            </div>

            <div class="todo_list_block__rewrite${i}">
                <button><img width="16" src="./img/edit.svg" alt="picture edit"></button>
            </div>
            <div class="todo_list_block__delete${i}">
                <button><img width="16" src="./img/close.svg" alt="picture edit"></button>
            </div>
        </div>
            `);
        }
    }
     else {
        todoArray2 = [];
        document.querySelector('div.todo_list').insertAdjacentHTML('afterbegin', `
        <div class="no-res"><p>У вас нет текущих задач.</></div>
        `)
    }

    if (localStorage.getItem('todo') === '[]' || localStorage.getItem('todo') === []) {
        document.querySelector('div.todo_list').insertAdjacentHTML('afterbegin', `
        <div class="no-res"><p>У вас нет текущих задач.</></div>
        `)    
    }

    for(let i = 0; i < checkTodo.length; i++) {
        if(document.querySelector(`.todo_list_block__rewrite${i}`)) {
            document.querySelector(`.todo_list_block__rewrite${i}`).addEventListener('click', () => {
                const newParams = prompt('Введите новое значение');
                if(newParams.length < 3) return false;

                checkTodo[i].text = newParams;
                let todoData2 = {
                    text: checkTodo[i].text
                }

                todoArray2[i] = todoData2; 
                window.localStorage.setItem('todo', JSON.stringify(todoArray2));
                location.reload();
            })
        }

        if(document.querySelector(`.todo_list_block__delete${i}`)) {
            document.querySelector(`.todo_list_block__delete${i}`).addEventListener('click', () => {
                let todoData2 = {
                    text: checkTodo[i].text
                }

                todoArray2[i] = todoData2;
                todoArray2.splice(i, 1);

                window.localStorage.setItem('todo', JSON.stringify(todoArray2));
                location.reload();
            })
        }  
    }


    fetch('https://api.openweathermap.org/data/2.5/weather?q=Karagandy,kz&APPID=83c6c6096bcd52922051aa1bd675876c&units=metric')
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        document.querySelector('.weather_state').innerHTML = `Now is ${res.weather[0].description}`;
        document.querySelector('.weather_city').innerHTML = res.name;
        document.querySelector('.weather_c').innerHTML = Math.round(res.main.temp) + '&deg';
        document.querySelector('.weather_icon').innerHTML = `<img alt = 'weaather picture' src='https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png'>`;
    })
