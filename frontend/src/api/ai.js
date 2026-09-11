import api from "./axios"

export const getResumeTips = (jobDescription) => 
    api.post('/api/ai/resume-tips', {jobDescription})
    