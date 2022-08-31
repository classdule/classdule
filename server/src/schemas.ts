import {z} from 'zod'

export const username = z.string({
    required_error: "Username is required"
})
    .min(4, 'Username must be at least 4 characters')
    .max(255, 'Username must be smaller than 256 characters')
    
export const password = z.string({
    required_error: "Username is required"
})
    .min(8, 'Password must be at least 8 characters')
    .max(255, 'Password must be smaller than 256 characters')
