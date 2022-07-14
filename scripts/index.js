const form = document.querySelector("[data-form-login]")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form).entries())
    await checkUser(data.email)
})

async function checkUser(emailToCheck) {
    const token = localStorage.getItem("jwt")
    if (!token) {
        alert("Por favor, efetue o cadastro!")
        location.href = "/signup.html"
        return;
    }

    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': token.replaceAll('"', '')
        }
    }

    await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe", options)
        .then((res) => res.json())
        .then(({ email }) => {
            if (email === emailToCheck) {
                location.href = "/tarefas.html"
            } else {
                alert("e-mail ou senha invalido!")
            }
        })
        .catch((err) => console.error(err.message))
}