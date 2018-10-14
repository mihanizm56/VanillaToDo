
import Model from "./model.js";
import View from "./view.js";

const Controller = {
    init() {
        Model.insertFromStorage()
            .then(data => {
                //console.log(data);
                this.insertTasks(data);
                this.renderModelStorage(data)
            })
        this.addListeners();
    },
    addListeners() {
        document.addEventListener('click', () => { this.delegateClick(event) })
    },
    delegateClick(event) {
        //console.log(event.target.className);
        if (event.target.className == "add-button") return this.addTask(event);
        if (event.target.className == "save-button") return this.saveToStorage();
        if (event.target.className == "done-box") return this.doneCheck(event);
        if (event.target.className == "delete-button") return this.deleteTask(event);
    },
    addTask(event) {
        //console.log("пришло в addTask");
        const task = event.target.parentElement.firstElementChild.value;
        const doneCheck = event.target.previousElementSibling.checked;
        const object = { task, doneCheck }

        Model.saveToModelStorage(task, object);
        View.addTask(object);
    },
    saveToStorage(){
        Model.cleanLocalStorage();
        Model.saveToLocalStorage(Model.modelStorage);
    },
    insertTasks(object) {
        View.cleanWrapper();
        //console.log('checkInsert')
        for (let key in object) {
            View.addTask(object[key]);
        }
    },
    deleteTask(event) {
        //console.log("прилетело в deleteTask");
        const key = event.target.parentElement.firstElementChild.innerText
        const element = event.target.parentElement;

        element.style.display = "none";
        delete Model.modelStorage[key]
    },
    renderModelStorage(object){
        //console.log("renderModelStorage");
        //console.log(object);
        Model.modelStorage = {...object}
        //console.log("Model.modelStorage");
        //console.log(Model.modelStorage);
    },
    doneCheck(event) {
        //console.log("doneCheck");
        Model.modelStorage[event.target.parentElement.firstElementChild.innerText].doneCheck = event.target.checked;
    }
}

export default Controller