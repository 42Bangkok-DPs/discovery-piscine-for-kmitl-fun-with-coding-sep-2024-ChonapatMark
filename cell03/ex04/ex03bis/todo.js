$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $newBtn = $('#newBtn');

    loadTodos();

    $newBtn.click(function() {
        const todo = prompt('Enter a new TO DO:');
        if (todo && todo.trim() !== '') {
            console.log(todo)
            addTodo(todo);
            saveTodos();
        }
    });

    function addTodo(todo) {
        const $div = $('<div>', { class: 'todo-item' });
        const $todoText = $('<span>').text(todo);
        const $removeBtn = $('<button>', { class: 'delete', text: 'Delete' });

        $removeBtn.click(function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $div.remove();
                saveTodos();
            }
        });

        $div.append($todoText, $removeBtn);
        $ftList.prepend($div);
    }

    function saveTodos() {
        const todos = $ftList.children().map(function() {
            return $(this).find('span').text();
        }).get();
        console.log(todos);
        document.cookie = `todos=${JSON.stringify(todos)}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
    }
        console.log(document.cookie)

    function loadTodos() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookie) {
            const todos = JSON.parse(cookie.split('=')[1]);
            $.each(todos.reverse(), function(todo) {
                addTodo(todo);
            });
        }
    }
});
