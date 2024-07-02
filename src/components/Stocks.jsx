// import React, { useState, useEffect } from 'react';
// import { getStockQuote, getCompanyProfile } from '../functions/finnhubService';  // Adjust the path as necessary

// const Stocks = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   const symbols = [
//     'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'PYPL', 'INTC', 'CSCO',
//     'NFLX', 'ADBE', 'CMCSA', 'PEP', 'AVGO', 'QCOM', 'TXN', 'AMGN', 'AMD', 'MDLZ',
//     'COST', 'MRNA', 'SBUX', 'GILD', 'CSX', 'FISV', 'AMT', 'BIDU', 'WBA', 'ISRG',
//     'LRCX', 'EXC', 'LULU', 'FIS', 'SPLK', 'VRTX', 'KHC', 'BIIB', 'LUV', 'WDC',
//     'ROST', 'CLX', 'MCHP', 'MTCH', 'ZBRA', 'HCA', 'MELI', 'SPLK', 'RBLX', 'CME',
//     'PDD', 'NKE', 'PSX', 'DDOG', 'ZION', 'COUP', 'SJM', 'CERN', 'XEL', 'BWA',
//     'DTE', 'CME', 'BMRN', 'CDNS', 'KMB', 'FANG', 'KMI', 'IQV', 'CTXS', 'ORLY',
//     'HPE', 'O', 'STX', 'MRVL', 'ROST', 'VRSK', 'VZ', 'RCL', 'CDW', 'STX',
//     'ALLY', 'KHC', 'WELL', 'SYY', 'BXP', 'LMT', 'TTWO', 'MCK', 'ZTS', 'GPN'
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const stockDataPromises = symbols.map(async (symbol) => {
//           try {
//             const [quote, profile] = await Promise.all([
//               getStockQuote(symbol),
//               getCompanyProfile(symbol)
//             ]);

//             return {
//               symbol,
//               price: quote.c,
//               change: quote.c - quote.pc,
//               volume: quote.v,
//               name: profile.name || 'N/A'
//             };
//           } catch (err) {
//             return {
//               symbol,
//               price: 'Error',
//               change: 'Error',
//               volume: 'Error',
//               name: 'Error'
//             };
//           }
//         });

//         const stockData = await Promise.all(stockDataPromises);

//         if (stockData.length === 0) {
//           throw new Error('No valid data received from Finnhub');
//         }

//         setData(stockData);
//       } catch (err) {
//         setError(`Error fetching data: ${err.message}`);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Top 100 NASDAQ Stocks</h1>
//       {error && <p>{error}</p>}
//       {data.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Symbol</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Change</th>
//               <th>Volume</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((stock, index) => (
//               <tr key={index}>
//                 <td>{stock.symbol || 'N/A'}</td>
//                 <td>{stock.name || 'N/A'}</td>
//                 <td>${(stock.price || 0).toFixed(2)}</td>
//                 <td>
//                   {((stock.change || 0).toFixed(2))}
//                   <span style={{ color: (stock.change || 0) < 0 ? 'red' : 'green' }}>
//                     {(stock.change || 0) < 0 ? ' ▼' : ' ▲'}
//                   </span>
//                 </td>
//                 <td>{Number(stock.volume || 0).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Stocks;
