
import Model from "./model.js";
import View from "./view.js";

const Controller = {

    init() {
        this.renderTasks()

        this.addListeners();
    },

    renderTasks(){
        Model.insertFromStorage().then(data => {
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
        if(event.target.classList.contains('button-open')||event.target.className == "button-close") return this.changeStateOfApp(event);
        if (event.target.className == "button-update") return this.updateWindow(event);
    },

    updateWindow(){
        window.location.reload();
    },

    changeStateOfApp(){
        const newTask = document.querySelector(".new-task");
        const buttonOpen = document.querySelector(".button-open");

        newTask.classList.toggle("new-task--active");
        buttonOpen.classList.toggle("button-open--active");
    },

    addTask(event) {
        const task = event.target.parentElement.firstElementChild.value;
        const object = { task, 'doneCheck':false }

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
        const title = event.target.parentElement.previousElementSibling.firstElementChild;
        const inputTitle = title.nextElementSibling;
        
        View.hideElement(title)
        View.showElement(inputTitle)
    },

    saveChangesInTask(event){
        const title = event.target.parentElement.previousElementSibling.firstElementChild.value;
        const titleElement = event.target.parentElement.previousElementSibling.firstElementChild;
        const inputTitle = titleElement.nextElementSibling;
        const doneCheck = inputTitle.nextElementSibling.checked;

        titleElement.value = inputTitle.value;

        View.hideElement(inputTitle)
        View.showElement(titleElement)

        delete Model.modelStorage[title];

        Model.modelStorage[titleElement.value] = {
            task: titleElement.value,
            doneCheck: doneCheck
        };
        Model.saveToLocalStorage(Model.modelStorage);
    },

    deleteTask(event) {
        const key = event.target.parentElement.previousElementSibling.firstElementChild.value
        const element = event.target.parentElement.parentElement;

        View.hideElement(element)

        delete Model.modelStorage[key]
        Model.saveToLocalStorage(Model.modelStorage);
    },

    renderModelStorage(object){
        Model.modelStorage = {...object}
    },

    doneCheck(event) {
        const title = event.target.previousElementSibling.previousElementSibling

        if (event.target.checked){
            View.decorateTextOfElement(title,'italic',"line-through")
        }

        else{
            View.decorateTextOfElement(title,'normal',"none")
        }

        Model.modelStorage[event.target.parentElement.firstElementChild.value].doneCheck = event.target.checked;
        Model.saveToLocalStorage(Model.modelStorage);
    }
}

export default Controller