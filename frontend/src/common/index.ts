const authData = JSON.parse(localStorage.getItem('authData') as any)
const token = authData?.data.token ? authData.data.token :''
export const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const authHeaders = { 'Authorization': `JWT ${token}` }