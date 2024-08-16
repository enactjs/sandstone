import {env, pipeline} from '@xenova/transformers';

class MyQAPipeline {
    static model = 'iagovar/roberta-base-bne-sqac-onnx';
    static task = 'question-answering';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            env.allowLocalModels = false;
            this.instance = pipeline(this.task, this.model, {progress_callback});
        }
        console.log('loaded model', this.model);
        return this.instance;
    }
    
}

self.addEventListener('message', async (event) => {
    const {type} = event.data;
    if (type === 'ask') {
        // Retrieve the translation pipeline. When called for the first time,
        // this will load the pipeline and save it for future use.
        const qa = await MyQAPipeline.getInstance(x => {
            // We also add a progress callback to the pipeline so that we can
            // track model loading.
            self.postMessage(x);
        });

        try {
            const {question, context} = event.data;
            const response = await qa(question, context);

            console.log('response',response);

            self.postMessage({
                status: 'complete',
                response: response.answer
            });
        } catch (error) {
            console.error(error);
        }
    }
})