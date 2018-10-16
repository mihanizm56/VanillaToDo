const View = {
  
  addTask(object) {
    const wrapper = document.querySelector(".task-wrapper");
    const container = document.createElement('div');
    container.className = 'using-task';
    let checked = object.doneCheck ? 'checked' : '';

    let textStyle = object.doneCheck ? 'font-style:italic;text-decoration:line-through;' : 'font-style:normal;text-decoration:none;';

    container.innerHTML = `
        <div class='using-task__task'>
          <textarea disabled type="text" placeholder="задача" class="task-name" style=${textStyle} >${object.task}</textarea>
          <textarea class="task-name-input" style='display:none;' id="doneBox" >${object.task}</textarea>
          <input type="checkbox" ${checked} class="done-box" id="doneBox">
        </div>
        <div class='using-task__buttons'>
          <button id="addButton" class="change-button">Редактировать</button>
          <button id="saveButton" class="save-item-button">Сохранить</button>
          <button id="saveButton" class="delete-button">Удалить</button> 
        </div>
    `;
    
    wrapper.appendChild(container);
  },

  cleanWrapper(){
    document.querySelector(".task-wrapper").innerHTML = "";
  }
}


export default View