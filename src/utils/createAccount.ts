const createAccountNumber = () => {
    return Math.random().toString().slice(2, 12)
}

export default createAccountNumber