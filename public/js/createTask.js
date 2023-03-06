//listener & function for creating a task on the To Do page

const addTask = document.getElementById('userId')

const newTask = async (e) => {
    e.preventDefault();

   const task = document.getElementById('task').value; 
   const user_id = Number(document.getElementById('userId').dataset.user);

   console.log(user_id)
   console.log(task)

    if (task) {
        const response = await fetch('/api/tasks/', {
            method: 'POST',
            body: JSON.stringify({task, user_id}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/todo')
        } else {
            alert('failed to post')
        }

    }

}

addTask.addEventListener('submit', newTask)