export default class Controller {
  constructor(data) {
    this.data = data;
  }
  saveToStorage() {
    console.log("saved to storage");
    localStorage.data = JSON.stringify(this.data);
  }
  cleanLocalStorage() {
    console.log("storage is cleared");
    localStorage.data = "";
  }
}
