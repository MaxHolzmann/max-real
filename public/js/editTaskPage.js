// function & listener for the edit task page

const editTaskForm = document.getElementById('edit-task');

const editTask = async (e) => {
    e.preventDefault();

    const task = document.getElementById('task-body').value;
    const id = document.getElementById('task-body').dataset.id;

    if(task && id) {
        const response = await fetch ('/api/tasks/' + id, {
            method: 'PUT',
            body: JSON.stringify({task}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/todo')
        } else {
            alert('error editing!')
        }

    }


}

editTaskForm.addEventListener('submit', editTask)