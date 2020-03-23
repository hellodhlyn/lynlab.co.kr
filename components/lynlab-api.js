import axios from 'axios';

function queryCms(queryString) {
  return axios.get(`https://cms.lynlab.co.kr/graphql?query=query{${queryString}}`).then((res) => {
    if (res.data.errors) {
      throw new Error('Query error');
    }
    return res.data.data;
  });
}

function queryWiki(queryString) {
  const data = `query { ${queryString} }`;
  const options = { headers: { 'Content-Type': 'application/graphql; charset=utf-8' } };
  return axios.post('https://wiki.lynlab.co.kr/graphql', data, options).then((res) => {
    if (res.data.errors) {
      throw new Error('Query error');
    }
    return res.data.data;
  });
}

export { queryCms, queryWiki };
