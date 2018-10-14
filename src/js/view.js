const View = {
  addTask(object) {
    console.log("check View.addTask");
    const wrapper = document.querySelector(".main-wrapper");
    const container = document.createElement('div')
    container.innerHTML = `
    <div class="using-task">
        <input type="text" placeholder="задача" class="task-input" value=${object.task}>
        <input type="checkbox" class="done-box" id="doneBox">
        <button id="addButton" class="add-button">Редактировать</button>
        <button id="saveButton" class="save-button">Удалить задачу</button>
    </div>
    `
    wrapper.appendChild(container);
  },
  cleanWrapper(){
    const wrapper = document.querySelector(".main-wrapper");
    wrapper.innerHTML = ''
  }
}


export default View