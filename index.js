// html 요소들을 자바스크립트 변수로 가져오기
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

// localStorage에서 데이터를 가져오는데 없으면 빈 배열로 시작    
let todos = JSON.parse(localStorage.getItem("todos")) || [];

    
function renderTodos() {
    // 기존 목록을 비워서 중복 방지
    todoList.innerHTML = "";

    
    todos.forEach((todo, index) => {
        
        const li = document.createElement("li");

        // 완료상태면 'completed' 클래스 추가 줄 긋기
        if(todo.completed) {
            li.classList.add("completed");
        }

        // 리스트 내부 구조 설정
        // 택스트, 버튼 그
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

            // 완료 버튼을 클릭해서 변경된 점을 저장하고 불러오기
            saveTodos();
            renderTodos();
        });

        // 수정 버튼
        li.querySelector(".edit-btn")
        .addEventListener("click", () => {

            // prompt로 새 내용을 입력받아 수정
            const newText = prompt("수정할 내용을 입력하세요", todo.text);

            if(newText !== null && newText.trim() !== "") {
                todos[index].text = newText;

                // 변경된 내용 저장 후 불러오기
                saveTodos();
                renderTodos();
            }
        });

        // 삭제 버튼
        li.querySelector(".delete-btn")
        .addEventListener("click", () => {

            // splice를 이용해 배열에서 해당 인덱스 제거
            todos.splice(index, 1);

            // 변경된 내용 저장 후 불러오기
            saveTodos();
            renderTodos();
        });
        // 생성된 li를 추가
        todoList.appendChild(li);

        });
}

// todos 배열을 JSON문자열로 바꿔 localStorage에 저장
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 입력창의 값을 가져와 새 할 일을 배열에 추가
function addTodo() {

    const text = todoInput.value.trim();

    if(text === "") {
        alert("할 일을 입력하세요!");
        return;
    }

    // 배열에 새 객체 추가
    todos.push({
        text: text,
        completed: false
    });

    // 저장 후 불러오기
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

// 불러오기
renderTodos();
