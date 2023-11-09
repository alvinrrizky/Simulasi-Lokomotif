export const fetchingSummarylatest = async () => {
    const URL = `http://localhost:8081/summary/latest`
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error("Fetching Error") 
    }
    return await response.json() 
}

export const fetchingSummaryAll = async (orderBy, page) => {
const URL = `http://localhost:8081/summary/all?orderBy=${orderBy}&page=${page}`
const response = await fetch(URL)
if (!response.ok) {
    throw new Error("Fetching Error") 
}
return await response.json() 
}