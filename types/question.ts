import Alternative from "./alternative";
import Topic from "./topic";

export default interface Question {
  id: string;
  text: string;
  university: string;
  subject: string;
  topics: Topic[];
  alternatives: Alternative[];
}
