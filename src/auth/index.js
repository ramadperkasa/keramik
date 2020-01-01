const setToken = (token, expiration) => {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expiration)
}

const getToken = () => {
    var token = localStorage.getItem('token')
    var expiration = localStorage.getItem('expiration')

    if (!token || !expiration)
        return null

    if (Date.now() > parseInt(expiration)) {
        this.destroyLocalStorage()
        return null
    } else {
        return token
    }
}

const destroyLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
}

const isAuthenticated = () => {

    if (getToken())
        return true
    else
        return false
}

export {
    setToken,
    getToken,
    destroyLocalStorage,
    isAuthenticated
}