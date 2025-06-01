import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const summarySchema = {
    type: "object",
    properties: {
        summary: {
            type: "string",
            description: "A concise summary of what the repository is about"
        },
        cool_facts: {
            type: "array",
            items: {
                type: "string"
            },
            description: "An array of interesting facts about the repository"
        }
    },
    required: ["summary", "cool_facts"],
    additionalProperties: false
};

function validateSummaryOutput(output) {
    // Basic schema validation
    if (typeof output !== 'object' || output === null) {
        throw new Error('Output must be an object');
    }

    if (typeof output.summary !== 'string' || !output.summary) {
        throw new Error('Summary must be a non-empty string');
    }

    if (!Array.isArray(output.cool_facts) || output.cool_facts.length === 0) {
        throw new Error('Cool facts must be a non-empty array');
    }

    if (!output.cool_facts.every(fact => typeof fact === 'string' && fact)) {
        throw new Error('Each cool fact must be a non-empty string');
    }

    const extraKeys = Object.keys(output).filter(key => !['summary', 'cool_facts'].includes(key));
    if (extraKeys.length > 0) {
        throw new Error(`Unexpected properties found: ${extraKeys.join(', ')}`);
    }

    return output;
}

async function createGitHubSummaryChain() {
    const llm = new ChatOpenAI({
        temperature: 0.7,
        modelName: "gpt-4",
        maxTokens: 1000,
    });

    const summaryTemplate = `
    You are a helpful assistant that summarizes GitHub repositories based on their README content.
    Please analyze the following README content and provide:
    1. A concise summary of what the repository is about (max 3 sentences)
    2. A list of 3-5 most interesting facts or key features
    
    README Content:
    {readme_content}
    
    Provide your response in valid JSON format with exactly these fields:
    - "summary": A string containing the repository summary
    - "cool_facts": An array of strings with interesting facts
    
    Ensure your response can be parsed as JSON.
    `;

    const promptTemplate = PromptTemplate.fromTemplate(summaryTemplate);

    const chain = RunnableSequence.from([
        {
            readme_content: (input) => {
                if (!input.readme || typeof input.readme !== 'string') {
                    throw new Error('Invalid input: readme must be a non-empty string');
                }
                return input.readme;
            }
        },
        promptTemplate,
        llm,
        new StringOutputParser(),
        (output) => {
            try {
                const parsed = JSON.parse(output);
                return validateSummaryOutput(parsed);
            } catch (e) {
                console.error("Error processing LLM output:", e);
                throw new Error('Failed to generate valid summary format');
            }
        }
    ]);

    return chain;
}

export async function summarizeGitHubReadme(readmeContent) {
    try {
        const chain = await createGitHubSummaryChain();
        const result = await chain.invoke({
            readme: readmeContent
        });
        return result;
    } catch (error) {
        console.error("Error in summarization chain:", error);
        throw error;
    }
} 