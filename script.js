(function () {

    const inputUser = document.querySelector('#user_input');
    const btnAdd = document.querySelector('#id_button_add');
    const btnDelAll = document.querySelector('#id_button_clear');
    const list = document.querySelector('#todo_list');
    const msg = document.querySelector('#message_for_user');

    let todos = [];

    const addForm = document.querySelector('#add_form');

    /* get tasks from local storage */

    getFromStorage();
    addTask();

    /* delete tasks before add sth */
    
    let btnArrayBefore = document.querySelectorAll('.delete_before');
    oneDelete(btnArrayBefore);

    /* add tasks */

    function getFromStorage() {
        
        // when localStorage is empty assign empty array to todos
        
        todos = JSON.parse(localStorage.getItem('todos')) || [];

        console.log(todos);
    }

    function getData(form) {
        const data = {};
        
        // FormData get data from form
        
        const formData = new FormData(form);
        
        for (let input of formData.entries()) {
            data[input[0]] = input[1];
        }

        return data;
    }

    function pushToArray(todo) {
        todos.push(todo);

        todos.sort(function (a, b) {
            let c = new Date(a.item_date);
            let d = new Date(b.item_date);
            return c - d;
        });

        // put item in localStorage
        
        localStorage.setItem('todos', JSON.stringify(todos));

        return todos;
    }

    function startApp() {
        pushToArray(getData(addForm));
        //    console.log(todos);
        let userInput = document.querySelector('#user_input').value;
        if (userInput === '') {
            msg.innerHTML = 'put your task in input above';
        } else {
            addTask();
        }
    }

    btnAdd.addEventListener('click', (e) => {
        startApp();
    });

    inputUser.addEventListener('keydown', (e) => {
        if (e.which === 13) {
            startApp();
        }
    });


    function addTask() {

        document.querySelector('#user_input').value = '';
        document.querySelector('#user_input').focus();
        msg.innerHTML = '';

        document.querySelector('#todo_list').innerHTML = '';

        for (let i = 0; i < todos.length; i++) {

            let itemContent = todos[i].item;
            let itemDate = todos[i].item_date;

            /* create list element with editing possibility */

            let liList = document.createElement('li');
            let inputList = document.createElement('textarea');
            let notesTxt = document.createTextNode(itemContent);
            inputList.appendChild(notesTxt);

            liList.appendChild(inputList);

            /* create input with date */

            let pDate = document.createElement('p');
            let pDateTxt = document.createTextNode('your deadline: ' + itemDate);

            pDate.appendChild(pDateTxt);

            liList.appendChild(pDate);

            /* create button - for done tasks to delete them */

            let btnDeleteList = document.createElement('button');
            btnDeleteList.setAttribute('class', 'button_delete');
            let btnDeleteTxt = document.createTextNode('done!');
            btnDeleteList.appendChild(btnDeleteTxt);

            liList.appendChild(btnDeleteList);

            /* add all to list */

            list.appendChild(liList);
            
            /* delete one task */

            let btnArray = document.querySelectorAll('.button_delete');
            oneDelete(btnArray);

        }
    }


    /* delete task */

    function liDisappear(delBtn) {
        delBtn.parentNode.style.display = 'none';
    }

    function oneDelete(array) {
        for (let i = 0; i < array.length; i++) {      
            array[i].addEventListener('click', function () {
                liDisappear(this);
            });
        }
    }

    function clearData() {
        localStorage.clear();
    }

    btnDelAll.addEventListener('click', (e) => {
        list.innerHTML = '';
        clearData();
    });
}());
