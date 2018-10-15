const View = {
  
  addTask(object) {
    const wrapper = document.querySelector(".task-wrapper");
    const container = document.createElement('div');
    let checked = object.doneCheck ? 'checked' : '';

    container.innerHTML = `
    <div class="using-task">
        <div class='using-task__task'>
          <p type="text" placeholder="задача" class="task-name" >${object.task}</p>
          <textarea class="task-name-input" style='display:none;' id="doneBox" value = ${object.task}></textarea>
          <input type="checkbox" ${checked} class="done-box" id="doneBox">
        </div>
        <div class='using-task__buttons'>
          <button id="addButton" class="change-button">Редактировать</button>
          <button id="saveButton" class="save-item-button">Сохранить</button>
          <button id="saveButton" class="delete-button">Удалить</button> 
        </div>
    </div>
    `;
    
    wrapper.appendChild(container);
  },

  cleanWrapper(){
    document.querySelector(".task-wrapper").innerHTML = "";
  }
}


export default View