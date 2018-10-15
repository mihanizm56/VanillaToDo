
import Model from "./model.js";
import View from "./view.js";

const Controller = {

    init() {
        this.renderTasks()

        this.addListeners();
    
    },

    renderTasks(){
        Model.insertFromStorage().then(data => {
          //console.log(data);
          this.insertTasks(data);
          this.renderModelStorage(data);
        })
            // .then(()=>{
            //     this.addDrags();
            // })
    },

    addListeners() {
        document.addEventListener('click', () => { this.delegateClick(event) })
    },

    delegateClick(event) {
        if (event.target.className == "new-task__add-button") return this.addTask(event);
        if (event.target.className == "save-button") return this.saveToStorage();
        if (event.target.className == "done-box") return this.doneCheck(event);
        if (event.target.className == "delete-button") return this.deleteTask(event);
        if (event.target.className == "change-button") return this.changeTask(event);
        if (event.target.className == "save-item-button") return this.saveChangesInTask(event);
    },

    addTask(event) {
        const task = event.target.parentElement.firstElementChild.value;
        const doneCheck = event.target.previousElementSibling.checked;
        const object = { task, doneCheck }
        const inputPlace = document.querySelector(".new-task__task-input");
        inputPlace.value = "";
        if (task){
            Model.saveToModelStorage(task, object);
            Model.saveToLocalStorage(Model.modelStorage);
            this.renderTasks() 
        }
    },

    saveToStorage(){
        Model.cleanLocalStorage();
        Model.saveToLocalStorage(Model.modelStorage);
    },

    insertTasks(object) {
        View.cleanWrapper();

        for (let key in object) {
            View.addTask(object[key]);
        }
    },

    changeTask(event){
        const title = event.target.parentElement.firstElementChild;
        const inputTitle = event.target.parentElement.firstElementChild.nextElementSibling;

        title.style.display = 'none'
        inputTitle.style.display = "block";
    },

    saveChangesInTask(event){
        const startTitle = event.target.parentElement.firstElementChild.innerText
        const title = event.target.parentElement.firstElementChild;
        const inputTitle = event.target.parentElement.firstElementChild.nextElementSibling;
        const doneCheck = event.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.checked

        title.innerText = inputTitle.value;
        title.style.display = "block";
        inputTitle.style.display = "none";

        delete Model.modelStorage[startTitle];

        Model.modelStorage[title.innerText] = {
            task: title.innerText,
            doneCheck: doneCheck
        };
        Model.saveToLocalStorage(Model.modelStorage);
    },

    deleteTask(event) {
        const key = event.target.parentElement.firstElementChild.innerText
        const element = event.target.parentElement;

        element.style.display = "none";
        delete Model.modelStorage[key]
        Model.saveToLocalStorage(Model.modelStorage);
    },

    renderModelStorage(object){
        Model.modelStorage = {...object}
    },

    doneCheck(event) {
        Model.modelStorage[event.target.parentElement.firstElementChild.innerText].doneCheck = event.target.checked;
        Model.saveToLocalStorage(Model.modelStorage);
    }
}

export default Controller