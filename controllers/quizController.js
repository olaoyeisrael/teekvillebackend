const OpenAI = require('openai');
require('dotenv').config();

const generateQuestions = async (req, res) => {
    const { subject, difficulty, limit = 10 } = req.body;
    // console.log("subject", subject)
    // console.log("difficulty", difficulty)
    // console.log("limit", limit)
    // console.log("openai key", process.env.OPENAI_API_KEY)
    // return res.status(200).json({ limit: limit });

    if (!subject || !difficulty) {
        return res.status(400).json({ error: 'Subject and difficulty are required' });
    }

    try {
        const openai = new OpenAI(
            apiKey= process.env.OPENAI_API_KEY
        );
        

        const prompt = `Generate ${limit} multiple-choice questions for ${subject} at ${difficulty} level. 
        Format the output as a JSON array of objects, where each object has:
        - "question": string
        - "options": array of 4 strings
        - "answer": string (must be one of the options)
        
        Example:
        [
            {
                "question": "What is 2+2?",
                "options": ["1", "2", "3", "4"],
                "answer": "4"
            }
        ]
        
        Only return the JSON array, no other text.`;

        const response = await openai.responses.create({
            model: "gpt-3.5-turbo",
            input: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const content = response.output_text;
        
        // Attempt to parse JSON. If it fails, it might be due to extra text.
        let questions;
        try {
            questions = JSON.parse(content);
        } catch (e) {
            // fallback: try to find the array in the text
            const jsonMatch = content.match(/\[.*\]/s);
            if (jsonMatch) {
                questions = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('Failed to parse OpenAI response');
            }
        }

        res.status(200).json({ questions });

    } catch (error) {
        console.log('Error generating questions:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
};

module.exports = { generateQuestions };
