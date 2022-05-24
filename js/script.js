var elInput = findElement('.js-input')
let elList = findElement('.js-todos-list')



let localData = localStorage.getItem('toDos')

let toDos = JSON.parse(localData) ? JSON.parse(localData) : [];

console.log(JSON.parse(localData))

let handleDelate = (evt) => {
    let filteredArray = []
    for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].id !== evt.target.dataset.id) {
            filteredArray.push(toDos[i])
        }
        toDos = filteredArray
        renderElements(filteredArray)
    }

}

function createTodoItem (toDos){
    let elLi = createTag('li')
    let elCheckboxInput = createTag('input')
    let elText = createTag('p')
    let elDiv = createTag('div')
    let elAdditBtn = createTag('button')
    let elDelateBtn = createTag('button')

   //  Style El list and El Div 
    elLi.className = 'd-flex align-items-center py-2 px-3 border-bottom'
    elDiv.className = 'ms-auto'


   //  Style btn buttons
    elAdditBtn.className = 'btn btn-success'
    elDelateBtn.className = 'btn btn-danger ms-1'

    elAdditBtn.dataset.id = toDos.id 
    elDelateBtn.addEventListener('click', handleDelate)

    elAdditBtn.textContent = 'Edit'
    elDelateBtn.textContent = 'Delate'

    elCheckboxInput.type = 'checkbox';
    elCheckboxInput.className = 'form-check-input mt-0';
    elText.textContent = toDos.title;
    elText.className = 'm-0 ms-2'
       
    
    elDiv.appendChild(elAdditBtn)
    elDiv.appendChild(elDelateBtn)
    elLi.appendChild(elCheckboxInput)
    elLi.appendChild(elText)
    elLi.appendChild(elDiv)
    elList.appendChild(elLi)
}

function renderElements(array){
    elList.innerHTML = null
    for (let i = 0; i < array.length; i++){
      createTodoItem(array[i])
    }
}

function handleAddTodo(evt) {
    if (evt.keyCode === 13) {
        let newTodo = {
            id: uuid.v4(),
            title: elInput.value,
            isComplated: false
        }

        toDos.unshift(newTodo)

        localStorage.setItem('toDos', JSON.stringify(toDos))

        renderElements(toDos)
        elInput.value = null;
        console.log(toDos)
    }
}

elInput.addEventListener('keyup', handleAddTodo)
renderElements(toDos)
