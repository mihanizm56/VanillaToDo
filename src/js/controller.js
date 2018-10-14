
import Model from "./model.js";
import View from "./view.js";

const Controller = {
    init() {
        console.log('пришло в Controller.init')
        Model.insertFromStorage()
            .then((data) => {
                console.log(data)
                this.insertTasks(data);
            })
        this.addListeners()
    },
    addListeners() {
        document.addEventListener('click', () => { this.delegateClick(event) })
    },
    delegateClick(event) {
        console.log(event.target.className);
        if (event.target.className == "add-button") return this.addTask(event);
        if (event.target.className == "save-button") return Model.saveToLocalStorage();
        if (event.target.className == "update-button") return this.updateTasks();
    },
    addTask(event) {
        console.log("пришло в addTask");
        const task = event.target.parentElement.firstElementChild.value;
        const doneCheck = event.target.previousElementSibling.checked;
        const object = { task, doneCheck }

        Model.saveToModelStorage(object);
        View.addTask(object);
    },
    insertTasks(array) {
        View.cleanWrapper();
        array.map(object => {
            if (!object.doneCheck) {
                View.addTask(object);
            }
        })
    },
    updateTasks() {
        Model.insertFromStorage()
            .then((data) => {
                console.log('data updated')
                this.insertTasks(data);
            })
            .then(()=>{
                Model.cleanLocalStorage();
            })
    }
}

export default Controller