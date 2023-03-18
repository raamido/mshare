const form = document.querySelector('form')
const messageBox = document.querySelector('textarea')
const messageContainer = document.querySelector('.message')
const copyButton = document.querySelector('.floating-button')

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search)
    const message = params.get("message")

    if (message) {
        form.hidden = true
        messageContainer.hidden = false
        copyButton.hidden = false

        messageContainer.querySelector('p').textContent = atob(message)
    } else {
        form.hidden = false
        messageContainer.hidden = true
        copyButton.hidden = true

    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const SECRET_MESSAGE = btoa(messageBox.value)
    const params = new URLSearchParams(location.search)
    params.set("message", SECRET_MESSAGE)
    messageURL = location.href + '?' + params.toString();

    history.pushState(null, '', messageURL)
    event.target.reset()
    form.hidden = true
    messageContainer.hidden = false
    copyButton.hidden = false


    messageContainer.querySelector('p').textContent = atob(SECRET_MESSAGE)
})

window.addEventListener('popstate', (event) => {
    if (!event.state) {
        form.hidden = false
        messageContainer.hidden = true
        copyButton.hidden = true
    } else {
        copyButton.hidden = false

    }
})

copyButton.addEventListener('click', (event) => {
    navigator.clipboard.writeText(location.href.toString()).then(() => {
        event.target.setAttribute("data-tooltip", "Copied")
    })
})

copyButton.addEventListener('mouseleave', (event) => {
    event.target.setAttribute("data-tooltip", "Copy Link")
})
