const Model = {
  modelStorage: {},

  saveToLocalStorage(object) {
    console.log("saved to storage");
    console.log(object);
    localStorage.data = JSON.stringify(object);
  },

  cleanLocalStorage() {
    console.log("storage is cleared");
    localStorage.data = "";
  },

  saveToModelStorage(key,object) {
    this.modelStorage[key] = object
    console.log('this.modelStorage');
    console.log(this.modelStorage);
  },

  insertFromStorage() {
    return new Promise(resolve => {
      if (localStorage.data){
        const data = JSON.parse(localStorage.data);
        resolve(data);
      }
      else{
        console.log('locaStorage is empty')
      }
    })
  }
}


export default Model