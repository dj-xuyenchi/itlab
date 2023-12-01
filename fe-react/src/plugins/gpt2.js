import axiosGpt2 from "./axiosGpt2";


export const useGpt2 = {
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
            const response = await axiosGpt2.post('/v1/chat/completions', config)
            return response
        },
    },
}
