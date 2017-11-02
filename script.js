const btn_add = document.querySelector('#id_button_add');
const btn_del_all = document.querySelector('#id_button_clear');
const btn_sort = document.querySelector('#btn_sort');

const list = document.querySelector('#todo_list');
const msg = document.querySelector('#message_for_user');

/* delete default tasks before add sth */

let btn_array_before = document.querySelectorAll('.delete_before');
oneDelete(btn_array_before);

/* add tasks*/

btn_add.addEventListener('click', (e) => {
  addTask();
});

document.querySelector('#user_input').addEventListener('keydown', (e) => {
  if (e.which === 13) {
      addTask();
  }
});

/* clear all */

btn_del_all.addEventListener('click', (e) => {
  document.querySelector('#todo_list').innerHTML = '';
});

/* functions */

function addTask() {
  let user_input = document.querySelector('#user_input').value;
  
  if(user_input === '') {
    msg.innerHTML = 'put your task in input above';
  } else {
    document.querySelector('#user_input').value = '';
    document.querySelector('#user_input').focus();
    msg.innerHTML = '';
    
    /* create list element with editing possibility */
  
    let li_list = document.createElement('li');
    let input_list = document.createElement('textarea');
    let notes_txt = document.createTextNode(user_input);
    input_list.appendChild(notes_txt);
    
    li_list.appendChild(input_list);
    
    /* create input with date */
    
    let label_date = document.createElement('label');
    let label_date_txt = document.createTextNode('set your deadline');
    let input_date_list = document.createElement('input');
    input_date_list.setAttribute('type', 'date');
    input_date_list.setAttribute('class', 'input_date');
    
    label_date.appendChild(label_date_txt);
    label_date.appendChild(input_date_list);
    
    li_list.appendChild(label_date);
    
    /* create button - for done tasks to delete them */
    
    let btn_delete_list = document.createElement('button');
    btn_delete_list.setAttribute('class', 'button_delete');
    let btn_delete_txt = document.createTextNode('done!');
    btn_delete_list.appendChild(btn_delete_txt);
    
    li_list.appendChild(btn_delete_list);
    
    /* add all to list */
    
    list.appendChild(li_list);
  }
    
  /* delete one task */
    
    let btn_array = document.querySelectorAll('.button_delete');
    oneDelete(btn_array);
}

function liDisappear(delBtn) {
   delBtn.parentNode.style.display = 'none';
}


function oneDelete(array) {
   for(let i = 0; i < array.length; i++) {
      array[i].addEventListener('click', function() {
        liDisappear(this);                                    
      });
    }
}
