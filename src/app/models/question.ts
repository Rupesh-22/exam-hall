import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered?: boolean;
    score: number;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.score = data.score;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        data.options.forEach((o: any) => {
            this.options.push(new Option(o));
        });
    }
}