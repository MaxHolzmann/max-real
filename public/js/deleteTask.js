//listener & function for deleting a task on the To Do page

const deleteTask = async (e) => {
    e.preventDefault();

    const taskToDelete = Number(e.target.parentNode.dataset.taskid);

    console.log(taskToDelete)

    const response = await fetch ('/api/tasks/' + taskToDelete, {
        method: 'DELETE'
    })

    if(response.ok) {
        document.location.replace('/todo')
    } else {
        alert('error deleting!')
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll("#del-btn").forEach(el => {
        el.addEventListener('click', deleteTask);
    });
});