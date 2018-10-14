const View = {
  addTask(object) {
    console.log("check View.addTask");
    const wrapper = document.querySelector(".main-wrapper");
    const container = document.createElement('div')
    let checked = object.doneCheck ? 'checked' : ''

      

    container.innerHTML = `
    <div class="using-task">
        <p type="text" placeholder="задача" class="task-name" >${object.task}</p>
        <input type="checkbox" ${checked} class="done-box" id="doneBox">
        <button id="addButton" class="change-button">Редактировать</button>
        <button id="saveButton" class="delete-button">Удалить задачу</button>
    </div>
    `;
    wrapper.appendChild(container);
  },
  cleanWrapper(){
    const wrapper = document.querySelector(".main-wrapper");
    wrapper.innerHTML = ''
  }
}


export default View