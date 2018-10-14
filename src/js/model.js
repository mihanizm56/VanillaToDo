const Model = {
  modelStorage: [],

  saveToLocalStorage() {
    console.log("saved to storage");
    localStorage.data = JSON.stringify(this.modelStorage);
  },

  cleanLocalStorage() {
    console.log("storage is cleared");
    localStorage.data = "";
  },

  saveToModelStorage(object) {
    console.log("object");
    console.log(object);
    this.modelStorage.push(object)
    console.log('this.modelStorage');
    console.log(this.modelStorage);
  },

  insertFromStorage() {
    return new Promise(resolve => {
      if (localStorage.data){
        const data = JSON.parse(localStorage.data);
        console.log(`data = ${data}`)
        resolve(data);
      }
      else{
        console.log('locaStorage is empty')
      }
    })
  }
}


export default Model