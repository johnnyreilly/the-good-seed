export class IAsyncProps<TResponse> {
    isRequesting: boolean = false;
    response?: TResponse;
    error?: string;

}

export class Async<TRequest, TResponse> implements IAsyncProps<TResponse> {

    isRequesting: boolean = false;
    response?: TResponse;
    error?: string;

    constructor(private process: (request: TRequest) => Promise<TResponse>) {

    }

    run = async (request?: TRequest) => {
        try {
            this.isRequesting = true;
            const response = await this.process(request);
            this.response = response;
        } catch (error) {
            this.error = error.message ? error.message : error;
        } finally {
            this.isRequesting = false;
        }
        return this;
    }

    reset = () => {
        this.isRequesting = false;
        this.response = undefined;
        this.error = undefined;
    }

}
