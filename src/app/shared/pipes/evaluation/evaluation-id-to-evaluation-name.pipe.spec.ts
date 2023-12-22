import { EvaluationIdToEvaluationNamePipe } from './evaluation-id-to-evaluation-name.pipe';

describe('EvaluationIdToEvaluationNamePipe', () => {
  it('create an instance', () => {
    const pipe = new EvaluationIdToEvaluationNamePipe();
    expect(pipe).toBeTruthy();
  });
});
