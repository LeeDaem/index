const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

    
let todos = JSON.parse(localStorage.getItem("todos")) || [];

    
function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");

        if(todo.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
        <span>${todo.text}</span>
        <div class="btn-group">
        <button class="complete-btn">완료</button>
        <button class="edit-btn">수정</button>
        <button class="delete-btn">삭제</button>
        </div>
        `;

        // 완료 버튼
        li.querySelector(".complete-btn")
        .addEventListener("click", () => {

            todos[index].completed = !todos[index].completed;

            saveTodos();
            renderTodos();
        });

        // 수정 버튼
        li.querySelector(".edit-btn")
        .addEventListener("click", () => {

            const newText = prompt("수정할 내용을 입력하세요", todo.text);

            if(newText !== null && newText.trim() !== "") {
                todos[index].text = newText;

                saveTodos();
                renderTodos();
            }
        });

        // 삭제 버튼
        li.querySelector(".delete-btn")
        .addEventListener("click", () => {

            todos.splice(index, 1);

            saveTodos();
            renderTodos();
        });

        todoList.appendChild(li);

        });
}

// 저장 
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 추가
function addTodo() {

    const text = todoInput.value.trim();

    if(text === "") {
        alert("할 일을 입력하세요!");
        return;
    }

    
    todos.push({
        text: text,
        completed: false
    });

    saveTodos();
    renderTodos();

    todoInput.value = "";
}

// 버튼 클릭 이벤트
addBtn.addEventListener("click", addTodo);

// Enter 키 이벤트
todoInput.addEventListener("keydown", function(event) {

    if(event.key === "Enter") {
        addTodo();
    }

});

    
renderTodos();
