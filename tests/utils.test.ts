import selectStyleByCondition from '../utils/selectStyleByCondition';
import validateQuestionAnswer from '../utils/validateQuestionAnswer';


describe('selectStyleByCondition', () => {
  test('should return a single class when only one truthy value is provided', () => {
    const result = selectStyleByCondition('class1');
    expect(result).toBe('class1');
  });

  test('should return multiple classes separated by space when multiple truthy values are provided', () => {
    const result = selectStyleByCondition('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  test('should return an empty string when no truthy values are provided', () => {
    const result = selectStyleByCondition();
    expect(result).toBe('');
  });
});

describe('validateQuestionAnswer', () => {
    test('should not throw an error when the answer index is valid', () => {
      const question_alternatives = [{id: 1}, {id: 2}, {id: 3}];
      const answer_index = 2;
      expect(() => validateQuestionAnswer(question_alternatives, answer_index)).not.toThrow();
    });
  
    test('should throw an error when the answer index is not valid', () => {
      const question_alternatives = [{id: 1}, {id: 2}, {id: 3}];
      const answer_index = 4;
      expect(() => validateQuestionAnswer(question_alternatives, answer_index)).toThrow("The answer index is not valid");
    });
  
    test('should throw an error when the answer index is null', () => {
      const question_alternatives = [{id: 1}, {id: 2}, {id: 3}];
      const answer_index = null;
      expect(() => validateQuestionAnswer(question_alternatives, answer_index)).toThrow("The answer index is not valid");
    });
  
    test('should throw an error when the question alternatives are empty', () => {
      const question_alternatives:any = [];
      const answer_index = 1;
      expect(() => validateQuestionAnswer(question_alternatives, answer_index)).toThrow("The answer index is not valid");
    });
  });
