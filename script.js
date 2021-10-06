import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 1 }, // below normal load
    { duration: '10s', target: 10 }, // normal load
    { duration: '10s', target: 250 }, // around breaking point
    { duration: '10s', target: 150 }, // beyond breaking point
    { duration: '10s', target: 20 }, // scale down
  ],
};

const sleep_duration = 1;

export default function () {
    group('initial app load', () => {
    
    const product_max = 1000011;
    const product_min = 1;
    const question_max = 3518968;
    const question_min = 1;

    const product_id = Math.round((Math.random() * (product_max - product_min)) + product_min);
    const question_id = Math.round((Math.random() * (question_max - question_min)) + question_min);
    
    let getQuestions = http.get(`http://localhost:3000/qa/questions/${product_id}`);
    check(getQuestions, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(sleep_duration);

    let getAnswers = http.get(`http://localhost:3000/qa/questions/${question_id}/answers`);
    check(getAnswers, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(sleep_duration);
    })
}