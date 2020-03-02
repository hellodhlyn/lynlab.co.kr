import axios from 'axios';
import https from 'https';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

function query(queryString) {
  return instance.get(`https://cms.lynlab.co.kr/graphql?query=query{${queryString}}`).then((res) => {
    if (res.data.errors) {
      throw new Error('Query error');
    }
    return res.data.data;
  });
}

// eslint-disable-next-line import/prefer-default-export
export { query };
