const form = document.querySelector('form')
const messageBox = document.querySelector('textarea')


form.addEventListener('submit', (event) => {
    event.preventDefault()

    const SECRET_MESSAGE = btoa(messageBox.value)
    const params = new URLSearchParams(location.search)
    params.set("message", SECRET_MESSAGE)
    messageURL = location.href + '?' + params.toString();

    history.pushState(null, '', messageURL)
    event.target.reset()
})
