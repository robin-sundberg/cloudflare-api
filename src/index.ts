import { Hono } from 'hono';

type Environment = {
    readonly NOTION_QUEUE: Queue
    readonly NOTION_SECRET: string
}

const app = new Hono<{Bindings: Environment}>()

app.get('/', async ({req, env, text}) => {
    await env.NOTION_QUEUE.send("Hello World!!")

    return text('Hello Hono!')
})

async function queue(batch: MessageBatch, env: Environment, ctx: ExecutionContext) {
    for (const message of batch.messages) {
        console.log("message: ", JSON.stringify(message))
    }
}

export default {
    ...app,
    queue
}
