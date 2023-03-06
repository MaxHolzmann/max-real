// function for completing a task
const completeTask = async (e) => {
    e.preventDefault();

    console.log('Clicked Complete!')

    const taskToComplete = Number(e.target.parentNode.dataset.taskid);

    const response = await fetch ('/api/tasks/complete/' + taskToComplete, {
        method: 'PUT'
    })

    if(response.ok) {
        document.location.replace('/todo')
    } else {
        alert('error deleting!')
    }
}

//when pressing the edit button, this function sends the user to the proper edit page.
const goToEdit = (e) => {
    e.preventDefault();
    console.log('click')
    const taskId = Number(e.target.parentNode.dataset.taskid)
    document.location.replace('/edit/' + taskId)
}


window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll("#edit-btn").forEach(el => {
        el.addEventListener('click', goToEdit);
    });
});


window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll("#complete-btn").forEach(el => {
        el.addEventListener('click', completeTask);
    });
});