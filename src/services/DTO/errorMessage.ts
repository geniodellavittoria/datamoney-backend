
export class ErrorMessage {
    status: number;
    message: any;

    constructor(status: number, message: any) {
        this.status = status;
        this.message = message;
    }
}
