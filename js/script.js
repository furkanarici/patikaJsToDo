const getID = (id) => document.querySelector(`#${id}`);

const list = getID("list");

const initualTasks = [
  "3 Litre su İç",
  "Ödvlerini Yap",
  "En Az 3 Saat Kodlama Yap",
  "Yemek Yap",
  "50 Sayfa Kitap Oku",
];

const updateDB = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
console.log(JSON.parse(localStorage.getItem("data")));

if (localStorage.getItem("data") === null) {
  updateDB(initualTasks);
}

const getDataFromDB = (data) => {
  const dataFromDB = JSON.parse(localStorage.getItem(data));
  //   if (!dataFromDB) {
  //     updateDB(initualTasks);
  //     getDataFromDB(data);
  //   } else {
  return dataFromDB;
  //   }
};

const DB_TASK = getDataFromDB("data");

const deleteButton = `<span onclick="deleteElement(this)" class="mr-2 badge pointer text-white bg-danger">X</span>`;

const addNewTask = (item) => {
  const li = document.createElement("li");
  li.innerHTML = `${deleteButton} ${item}`;
  list.appendChild(li);
};

const initualElemets = (DB_TASK) => {
  DB_TASK.forEach((item) => {
    addNewTask(item);
  });
};

initualElemets(DB_TASK);

const newElement = () => {
  const input = getID("task");

  const value = input.value;

  if (value.trim()) {
    addNewTask(value);
    DB_TASK.push(value);
    updateDB(DB_TASK);
    addToast("Başarıyla Eklendi","bg-success");
  } else {
    addToast("Geçerli Bir Değer Giriniz","bg-warning");
  }
  input.value = "";
};

const deleteElement = (e) => {
  //   document.querySelector("#list").addEventListener("click", (e)=>clicked(e));
  //   function clicked(e) {
  //     console.log(e.target.innerHTML)
  //   }
  const parent = e.parentElement.innerHTML;

  const value = parent.slice(deleteButton.length);

  const data = [...getDataFromDB("data")];
  const filtered = data.filter((x) => x.trim() !== value.trim());

  list.removeChild(e.parentElement);

  updateDB(filtered);
};

const toastComponent = (message,type="bg-warning") => `
<div  class="position-fixed top-0 right-0 p-3" style="z-index: 5; right: 0; top: 0;">
<div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
  <div class="toast-header ${type}">

    <strong class="mr-auto ">Kodluyoruz Task Manager</strong>
    <button type="button"  onclick="closeToast()" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
   ${message}
  </div>
</div>
</div>
`;

const addToast = (message,type) => {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.id = "toast";
  const content = toastComponent(message,type);
  div.innerHTML = content;
  body.appendChild(div);

  setTimeout(() => {
    closeToast();
  }, 3000);
};

const closeToast = () => {
  const toast = getID("toast");
  const body = document.querySelector("body");
  body.removeChild(toast);
};
