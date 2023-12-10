import axiosGpt from "./axiosGpt";


export const useGpt = {
    actions: {
        async chat(paylay) {
            const config = {
                model: "gpt-3.5-turbo-1106",
                messages: [
                    {
                        role: "user",
                        content: paylay,
                    },
                ],
                max_tokens: 4000,
            }
            const response = await axiosGpt.post('/v1/chat/completions', config)
            return response
        },
    },
}
