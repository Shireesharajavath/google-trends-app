import { getGoogleTrends, getGoogleTrendsForMultipleKeywords } from './controllers/googleTrendsController.js';
 const rpc = new RetoolRPC({
  apiToken: 'retool_01k0evfddn0begk04435phht6t',
  host: 'https://zetaglobalcustomerengineeringintern.retool.com',
  resourceId: '8e81d1c4-ba61-484d-99df-de939fccb8f3',
  environmentName: 'production',
  pollingIntervalMs: 1000,
  version: '0.0.1',
  logLevel: 'info',
});
rpc.register({
  name: 'getGoogleTrends',  
  arguments: {
    keyword: { type: 'string', required: true },
    startTime: { type: 'string', required: false },
    endTime: { type: 'string', required: false },
  },
  implementation: async (args, context) => {
    const { keyword, startTime, endTime } = args;
 
    const start = startTime ? new Date(startTime) : undefined;
    const end = endTime ? new Date(endTime) : undefined;
 
    return await getGoogleTrends(keyword, start, end);
  }
});
 
rpc.register({
  name: 'getGoogleTrendsMultiple',
  arguments: {
    keywords: { type: 'string', required: true },
    startTime: { type: 'string', required: false },
    endTime: { type: 'string', required: false },
  },
  implementation: async (args, context) => {
    const { keywords, startTime, endTime } = args;
 
    const keywordArray = keywords.split(',').map(k => k.trim());
    const start = startTime ? new Date(startTime) : undefined;
    const end = endTime ? new Date(endTime) : undefined;
 
    return await getGoogleTrendsForMultipleKeywords(keywordArray, start, end);
  }
});
 
rpc.listen();
 