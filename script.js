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
  
  /* sorting - in progress*/
  
  btn_sort.addEventListener('click', (e) => {
    let date_array = document.querySelectorAll('.input_date');
    let first_nearest_date = date_array[0].value;
    
    // const li_to_sort = document.querySelectorAll('li');
  
    for(let i = 1; i < date_array.length; i++) {
      let check_nearest_date = date_array[i].value;
       let diff_date = new Date(first_nearest_date) - new Date(check_nearest_date);
      
       if(diff_date >= 0) {
         first_nearest_date = check_nearest_date;
         alert(first_nearest_date + ' różnica: ' + diff_date);
        
       } else {
         alert(first_nearest_date + ' first is first, różnica' + diff_date);
       }
      
     }
    
  });
    
  /* delete one task */
    
    let btn_array = document.querySelectorAll('.button_delete');
    oneDelete(btn_array);
}

function liDisappear(delBtn) {
   delBtn.parentNode.style.display = 'none';
}

/* sorting - in progress */

/* help from: https://developer.mozilla.org/en-US/docs/Web/Events/change */
/* ja tego do końca nie rozumiem, ale... ;) */
function changeEventHandler(event) {
    if(!event.target.value){
      alert('Please Select Date');
    } else {
      let get_date = event.target.value;
      alert(get_date); 
      
      //return get_date;
      
    } 
}

function oneDelete(array) {
   for(let i = 0; i < array.length; i++) {
      
      /* UWAGA! pytanie do wspaniałych i najmądrzejszych, najwyrozumialszych mentorów, dlaczego, jak robiłam zapis "(e) =>" nie działało? + i nie do końca rozumiem "this" */
      array[i].addEventListener('click', function() {
        liDisappear(this);                                    
      });
    }
}

/* Zapis i odczyt w localstorage - jeszcze nie umiem ;) */
/* Powiadomienia dla przeglądarki - JESZCZE nie umiem ;) */
/* ale to podobno będzie na kolejnych zajęciach, więc cierpliwie poczekam*/