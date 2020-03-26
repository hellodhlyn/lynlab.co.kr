import axios from 'axios';

function queryCms(queryString) {
  return axios.get(`https://cms.lynlab.co.kr/graphql?query=query{${queryString}}`).then((res) => {
    if (res.data.errors) {
      throw new Error('Query error');
    }
    return res.data.data;
  });
}

function requestWiki(data) {
  const options = { headers: { 'Content-Type': 'application/graphql; charset=utf-8' } };
  return axios.post('https://wiki.lynlab.co.kr/graphql', data, options).then((res) => {
    if (res.data.errors) {
      throw new Error('Query error');
    }
    return res.data.data;
  });
}

function queryWiki(queryString) {
  return requestWiki(`query { ${queryString} }`);
}

function mutateWiki(mutationString) {
  return requestWiki(`mutation { ${mutationString} }`);
}

export { queryCms, queryWiki, mutateWiki };
